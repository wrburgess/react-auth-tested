import userAuthentication from '../services/userAuthentication'

it('returns true for any email and password value', () => {
  const email = 'test@test.com'
  const password = 'asdfasdfasdfasdfasdf'
  expect(
    userAuthentication.authenticateWithEmailAndPassword(email, password),
  ).toBeTruthy()
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
