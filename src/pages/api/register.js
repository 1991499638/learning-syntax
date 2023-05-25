import { apiHandler, usersRepo } from '../../server/api/index'


export default apiHandler({
  post: register
})

// async function register (req, res) {
//   await usersRepo.create(req.body)
//   return res.status(200)
// }
async function register (req, res) {
  try {
    await usersRepo.create(req.body)
    res.status(200).send("创建成功") // 返回状态码为 200，表示创建成功
  } catch (error) {
    console.error("An error occurred during registration:", error)
    res.status(400).send("创建失败：" + error.message) // 返回状态码为 400，并携带错误信息
  }
}