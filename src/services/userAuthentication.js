const userAuthentication = {
  authenticateWithEmailAndPassword: (email, password) => {
    if (email && password) {
      return true
    } else {
      return false
    }
  },
}

export default userAuthentication
