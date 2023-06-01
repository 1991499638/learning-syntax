import { apiHandler, courseRepo } from '../../server/api/index'


export default apiHandler({
  post: upCourseStatus
})

async function upCourseStatus (req, res) {
  try {
    console.log('aaaaaaaaaaaaa', req.body.phone, req.body.index)
    const response = await courseRepo.updateETHCourseStatus(req.body.phone, req.body.index)
    res.status(200).send(response)
  } catch (error) {
    console.error(error, 'what fuck')
  }
}

