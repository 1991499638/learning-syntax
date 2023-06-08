import jwt from 'jsonwebtoken'
const getLoginStatus = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = jwt.decode(token)
    return decodedToken.sub
  } else {
    return null
  }
}

const getLayoutStatus = () => {
  localStorage.removeItem('token')
  return
}

export { getLoginStatus, getLayoutStatus }