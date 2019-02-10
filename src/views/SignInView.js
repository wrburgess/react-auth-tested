import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../helpers'
import { EMAIL, PASSWORD } from '../constants/formFields'

const SignInView = () => {
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [formError] = useState('')
  const [loading, setLoading] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
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
      <h1>Sign In</h1>
      <form autoComplete="off">
        {formError}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          autoCapitalize="none"
          autoCorrect="false"
          value={email}
          onFocus={() => setEmailTouched(true)}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => validateInputValue(setEmailError, EMAIL)}
        />
        {emailError}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoCapitalize="none"
          autoCorrect="false"
          value={password}
          onFocus={() => setPasswordTouched(true)}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => validateInputValue(setPasswordError, PASSWORD)}
        />
        {passwordError}

        <button
          value="Log In"
          type="submit"
          disabled={!isFormValid() || loading}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SignInView
