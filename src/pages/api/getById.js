import { apiHandler, usersRepo } from '../../server/api/index'


export default apiHandler({
  post: getByID
})

async function getByID (req, res) {
  try {
    const response = await usersRepo.getById(req.auth.sub)
    //能够执行 console.log(response.dataValues.userName, 'getByIddddddddddddddddd')
    res.status(200).send(response.dataValues)
  } catch (error) {
    console.log('error connect fail,try agian', error)
    res.status(400).send('登录失败' + error.message)//返回状态码为400，表示传送失败
  }
}
