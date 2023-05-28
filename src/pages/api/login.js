import { apiHandler, usersRepo } from '../../server/api/index'


export default apiHandler({
  post: login
})

async function login (req, res) {
  try {
    const response = await usersRepo.authenticate(req.body)
    // console.log('response', response)
    console.log('token', response.token)
    //send标识向前端传的东西，我今天才知道
    res.status(200).send(response)
  } catch (error) {
    console.error("An error occurred during registration:", error)
    res.status(400).send('登录失败:' + error.message)//返回状态码为400，并且携带错误信息
  }
}

