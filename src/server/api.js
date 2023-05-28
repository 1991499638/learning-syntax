import axios from 'axios'
import jwt from 'jsonwebtoken'




export const register = async (params) => {
  try {
    const response = await axios.post('http://43.159.199.39:3000/api/register', params.body)
    console.log(response.status, 'welcome to my world')
    return response.status

  } catch (error) {
    console.log(error)
    throw error
  }
}
export const login = async (paramas) => {
  try {

    const respons = await axios.post('http://43.159.199.39:3000/api/login', paramas.body)
    console.log(respons, 'welcome to login')
    return respons
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getById = async (paramas) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await axios.post('http://43.159.199.39:3000/api/getById', paramas.tokenID, { headers })
    //可以执行
    // console.log(response.data, 'welcome to getById')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const rePwd = async (paramas) => {
  try {
    console.log('已经调用')
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`
    }
    console.log(paramas.body, 'i dontg know why i fell bad ')
    const decodedToken = jwt.decode(token)
    const sendMessage = {
      phone: decodedToken.sub,
      password: paramas.body.password,
      newpassword: paramas.body.newpassword
    }
    console.log(sendMessage)
    const response = await axios.post('http://43.159.199.39:3000/api/changePassword', sendMessage, { headers })
    return (response)
  } catch (error) {
    console.log('errormessage', error)
    throw error
  }
}


