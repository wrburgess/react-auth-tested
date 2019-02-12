const userAuthentication = {
  authenticateWithEmailAndPassword: (email, password) => {
    if (email === 'test@succeed.com' && password === '1234567890') {
      return true
    } else {
      return false
    }
  },
}

export default userAuthentication
