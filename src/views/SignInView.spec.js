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

it('renders an error with invalid email', () => {
  const { getByTestId } = render(<SignInView />)
  const emailField = getByTestId('email-field')

  emailField.value = 'test@test'
  fireEvent.change(emailField)
  fireEvent.blur(emailField)
  expect(getByTestId('email-error').textContent).toBe(
    'A valid email address is required.',
  )
})

it('renders an error with invalid password', () => {
  const { getByTestId } = render(<SignInView />)
  const passwordField = getByTestId('password-field')

  passwordField.value = '1234'
  fireEvent.change(passwordField)
  fireEvent.blur(passwordField)

  expect(getByTestId('password-error').textContent).toBe(
    'Passwords need between 10 and 128 characters.',
  )
})
