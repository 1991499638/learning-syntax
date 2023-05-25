import { apiHandler, usersRepo } from '../../server/api/index'


export default apiHandler({
  post: changeinformation
})

async function changeinformation (req, res) {
  res.status(200).json('lily is so cute')
}