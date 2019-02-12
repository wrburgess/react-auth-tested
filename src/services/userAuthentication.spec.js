import userAuthentication from '../services/userAuthentication'

it('returns true for a correct email and password value', () => {
  const email = 'test@succeed.com'
  const password = '1234567890'
  expect(
    userAuthentication.authenticateWithEmailAndPassword(email, password),
  ).toBeTruthy()
})

it('returns false for an incorrect email and password value', () => {
  const email = 'test@fail.com'
  const password = '1234567890'
  expect(
    userAuthentication.authenticateWithEmailAndPassword(email, password),
  ).toBeFalsy()
})

it('returns false for missing email value', () => {
  const email = ''
  const password = 'asdfasdfasdfasdfasdf'
  expect(
    userAuthentication.authenticateWithEmailAndPassword(email, password),
  ).toBeFalsy()
})

it('returns false for missing password value', () => {
  const email = 'test@test.com'
  const password = ''
  expect(
    userAuthentication.authenticateWithEmailAndPassword(email, password),
  ).toBeFalsy()
})
