import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../helpers'
import { EMAIL, PASSWORD } from '../constants/formFields'
import userAuthentication from '../services/userAuthentication'

const SignInView = () => {
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    if (userAuthentication.authenticateWithEmailAndPassword(email, password)) {
      onLoginSuccess()
    } else {
      onLoginFail()
    }

    setLoading(false)
  }

  const validateInputValue = (setStateHook, fieldName) => {
    let message = null

    if (fieldName === EMAIL && !validateEmail(email)) {
      message = 'A valid email address is required.'
    }

    if (fieldName === PASSWORD && !validatePassword(password)) {
      message = 'Passwords need between 10 and 128 characters.'
    }

    setStateHook(message)
  }

  const onLoginSuccess = () => {
    setFormMessage(`You are logged in!`)
  }

  const onLoginFail = () => {
    setFormError(`There was a login failure.`)
  }

  const isFormValid = () => {
    return (
      emailTouched &&
      passwordTouched &&
      validateEmail(email) &&
      validatePassword(password)
    )
  }

  if (loading) {
    return (
      <div>
        <p>Loading!!!</p>
      </div>
    )
  }

  return (
    <div>
      <h1 data-testid="page-title">Sign In</h1>
      <form autoComplete="off" data-testid="page-form">
        {formMessage ? (
          <div data-testid="form-message">{formMessage}</div>
        ) : null}

        {formError ? <div data-testid="form-error">{formError}</div> : null}

        <label htmlFor="email">Email</label>
        <input
          data-testid="email-field"
          type="text"
          id="email"
          name="email"
          autoCapitalize="none"
          autoCorrect="false"
          value={email}
          onFocus={() => setEmailTouched(true)}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => validateInputValue(setEmailError, EMAIL)}
        />
        {emailError ? (
          <span data-testid="email-error">{emailError}</span>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          data-testid="password-field"
          type="password"
          id="password"
          name="password"
          autoCapitalize="none"
          autoCorrect="false"
          value={password}
          onFocus={() => setPasswordTouched(true)}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => validateInputValue(setPasswordError, PASSWORD)}
        />
        {passwordError ? (
          <span data-testid="password-error">{passwordError}</span>
        ) : null}

        <button
          data-testid="submit-button"
          value="Log In"
          type="submit"
          disabled={!isFormValid() || loading || false}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SignInView
