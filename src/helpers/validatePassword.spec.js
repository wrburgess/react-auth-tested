import validatePassword from './validatePassword';

it('returns false if non-valid password submitted', () => {
  const email = '1234';
  expect(validatePassword(email)).toBeFalsy();
});

it('returns true if valid password submitted', () => {
  const email = 'yJHMkceTLAoKiHVmCetyBNTugeuWgxfZM8eVYQUXkYGDURXj7c3ztx]FAzHhfsKf';
  expect(validatePassword(email)).toBeTruthy();
});
