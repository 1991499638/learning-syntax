import { db, errorHandler, jwtMiddleware, checkTokenExpiration } from './index'

export { apiHandler }

function apiHandler (handler) {
  //获取请求的方法，将其转换为小写的形式
  return async (req, res) => {
    const method = req.method.toLowerCase()

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`)

    try {
      // init db if required
      if (!db.initialized)
        await db.initialize()
      //token时间检查
      // global middleware
      await jwtMiddleware(req, res)
      if (req.auth) {
        await checkTokenExpiration(req.auth.exp)
      }
      // route handler
      await handler[method](req, res)
    } catch (err) {
      // global error handler
      errorHandler(err, res)
      console.log(err, 'cccccccccccccccccccc')

    }
  }
}


