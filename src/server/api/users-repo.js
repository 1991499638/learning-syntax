import getConfig from 'next/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './userdb'
import { serverRuntimeConfig } from '../../../next.config'
import Cookies from 'js-cookie'


export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  //delete:_delete
}

//登录功能的小模块，对账户喝密码进行验证
async function authenticate ({ phone, password }) {
  const user = await db.User.scope('withHash').findOne({
    where: { phone }
  })

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw 'Username or password is incorrect'
  }


  //帮你爹创建你爹的token 有效期7天
  const token = jwt.sign({ sub: user.phone }, serverRuntimeConfig.secret, { expiresIn: '7d' })


  //remove hash from return value

  //JSON.stringify是自己加的 不然小徐要忘
  const userJson = user.get()
  delete userJson.hash
  if (userJson.token) {
    Cookies.set('currentUser', JSON.stringify(userJson))
  }

  return {
    ...userJson,
    token
  }
}

//从数据库中得到整个表
async function getAll () {
  return await db.User.findAll()
}

//findByPk方法使用提供的主键从表中仅获得一个条目
//传入phone就行 不能传递params
async function getById (phone) {
  return await db.User.findByPk(phone)
}


async function create (params) {
  //validata
  //和第一次传值存在冲突，第一次传值无法进行查找，先进行注销

  // if (await db.User.findOne({ where: { phone: params.phone } })) {
  //   throw 'PhoneNumber"' + params.phone + '"is already exsist'
  // }
  const user = new db.User(params)

  //hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10)
  }

  // save user
  await user.save()
}

//顾名思义 update
async function update (phone, params) {
  const user = await db.User.findByPk(phone)


  //验证有效性
  if (!user) throw 'User not found'
  if (user.phone !== params.phone && await db.User.findOne({ where: { phone: params.username } })) {
    throw 'Username "' + params.phone + '" is already taken'
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10)
  }


  //copy params properties to 
}

//修改个人信息以及上传他吗的头像，doyouknow
