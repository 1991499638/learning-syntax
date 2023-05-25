import { apiHandler, usersRepo } from '../../server/api/index'


export default apiHandler({
  post: changeinformation
})

async function changeinformation (req, res) {
  console.log(req.token)
  res.status(200).json(req.token)
}