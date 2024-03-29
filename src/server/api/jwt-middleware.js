import { expressjwt } from 'express-jwt'
import util from 'util'
import getConfig from 'next/config'
import checkTokenExpiration from './checkTokenExpiration'

const { serverRuntimeConfig } = getConfig()

export { jwtMiddleware }

async function jwtMiddleware (req, res) {
  const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      // '/api/users/register',
      //  '/api/users/authenticate'
      '/api/register',
      '/api/login',
      '/api/test'
    ]
  })

  return util.promisify(middleware)(req, res)
}

