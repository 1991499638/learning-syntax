import axios from 'axios'



export const loginCode = (params) => axios.post('user/login/code', params)

export const getCode = (params) => axios.post('/user/login/getCode', params)

export const changeName = (params) => axios.post('user/account/changeName', params)

export const loginPwd = (params) => axios.post('user/login/pwd', params)

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


