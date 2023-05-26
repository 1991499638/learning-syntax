import { apiHandler, usersRepo } from '../../server/api/index'

export default apiHandler({
  post: changePwd
})

async function changePwd (req, res) {
  try {
    console.log(req.body.phone, req.body.password, req.body.newpassword, 'kisskisskisskisskisskisskisskiss')
    const response = await usersRepo.updatePassword(req.body.phone, req.body.password, req.body.newpassword)
    res.status(200).send(response)
  } catch (error) {
    console.log('error connect fail,try agian', error)
    res.status(400).send('修改失败' + error.message)//返回状态码为400,表示传送失败  
  }
}