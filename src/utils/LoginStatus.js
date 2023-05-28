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

const getLayoutStatus = async () => {
  console.log('消除token的函数已经诞生')
  await localStorage.removeItem('token')
}

export { getLoginStatus, getLayoutStatus }