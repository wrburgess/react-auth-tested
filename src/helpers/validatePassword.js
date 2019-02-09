const minimum = 10;
const maximum = 128;

export default (password) => {
  return password.length >= minimum && password.length <= maximum;
};
