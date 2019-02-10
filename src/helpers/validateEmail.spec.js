import validateEmail from './validateEmail'

it('returns false if non-valid email submitted', () => {
  const email = 'wrburgess'
  expect(validateEmail(email)).toBeFalsy()
})

it('returns true if valid email submitted', () => {
  const email = 'wrburgess@gmail.com'
  expect(validateEmail(email)).toBeTruthy()
})
