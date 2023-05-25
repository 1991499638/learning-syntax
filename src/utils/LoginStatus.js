const LoginStatus = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = jwt.decode(token)
    return decodedToken.sub
  } else {
    return
  }
}