import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from 'react-testing-library'
import SignInView from './SignInView'

afterEach(() => {
  cleanup()
})

it('on initials load, it renders the submit button as disabled', () => {
  const { getByText } = render(<SignInView />)
  const submitButton = getByText('Submit')
  expect(submitButton).toHaveAttribute('disabled')
})

it('renders an error with invalid email', () => {
  const { getByTestId, getByLabelText, getByText } = render(<SignInView />)
  const emailField = getByLabelText('Email')
  const submitButton = getByText('Submit')

  fireEvent.focus(emailField)
  fireEvent.change(emailField, { target: { value: 'test@test' } })
  fireEvent.blur(emailField)

  expect(submitButton).toHaveAttribute('disabled')
  expect(getByTestId('email-error').textContent).toBe(
    'A valid email address is required.',
  )
})

it('does not render an error with a valid email', () => {
  const { queryByTestId, getByLabelText, getByText } = render(<SignInView />)
  const emailField = getByLabelText('Email')
  const submitButton = getByText('Submit')

  fireEvent.focus(emailField)
  fireEvent.change(emailField, { target: { value: 'test@test.com' } })
  fireEvent.blur(emailField)

  expect(submitButton).toHaveAttribute('disabled')
  expect(queryByTestId('email-error')).toBeNull()
})

it('does not render an error with a valid password', () => {
  const { queryByTestId, getByLabelText, getByText } = render(<SignInView />)
  const passwordField = getByLabelText('Password')
  const submitButton = getByText('Submit')

  fireEvent.focus(passwordField)
  fireEvent.change(passwordField, { target: { value: '1234123412341234' } })
  fireEvent.blur(passwordField)

  expect(submitButton).toHaveAttribute('disabled')
  expect(queryByTestId('password-error')).toBeNull()
})

it('renders an error with invalid password', () => {
  const { getByTestId, getByLabelText, getByText } = render(<SignInView />)
  const passwordField = getByLabelText('Password')
  const submitButton = getByText('Submit')

  fireEvent.focus(passwordField)
  fireEvent.change(passwordField, { target: { value: '1234' } })
  fireEvent.blur(passwordField)

  expect(submitButton).toHaveAttribute('disabled')
  expect(getByTestId('password-error').textContent).toBe(
    'Passwords need between 10 and 128 characters.',
  )
})

it('renders an error when authentication fails', async () => {
  const { getByText, getByTestId, queryByTestId, getByLabelText } = render(
    <SignInView />,
  )
  const emailField = getByLabelText('Email')
  const passwordField = getByLabelText('Password')
  const submitButton = getByText('Submit')

  expect(submitButton).toHaveAttribute('disabled')
  fireEvent.focus(emailField)
  fireEvent.change(emailField, { target: { value: 'test@fail.com' } })
  fireEvent.blur(emailField)
  fireEvent.focus(passwordField)
  fireEvent.change(passwordField, { target: { value: '1234567890' } })
  fireEvent.blur(passwordField)
  expect(submitButton).not.toHaveAttribute('disabled')
  fireEvent.click(submitButton)

  await waitForElement(() => getByTestId('form-error'))

  expect(queryByTestId('form-message')).toBeNull()
  expect(getByTestId('form-error').textContent).toBe(
    'There was a login failure.',
  )
})

it('renders an message when authentication succeeds', async () => {
  const { getByText, getByTestId, queryByTestId, getByLabelText } = render(
    <SignInView />,
  )
  const emailField = getByLabelText('Email')
  const passwordField = getByLabelText('Password')
  const submitButton = getByText('Submit')

  expect(submitButton).toHaveAttribute('disabled')
  fireEvent.focus(emailField)
  fireEvent.change(emailField, { target: { value: 'test@succeed.com' } })
  fireEvent.blur(emailField)
  fireEvent.focus(passwordField)
  fireEvent.change(passwordField, { target: { value: '1234567890' } })
  fireEvent.blur(passwordField)
  expect(submitButton).not.toHaveAttribute('disabled')
  fireEvent.click(submitButton)

  await waitForElement(() => getByTestId('form-message'))

  expect(queryByTestId('form-error')).toBeNull()
  expect(getByTestId('form-message').textContent).toBe('You are logged in!')
})
