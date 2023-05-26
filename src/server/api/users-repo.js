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
  updatePassword,
  updatePhone
}

//登录功能的小模块，对账户密码进行验证.这里的密码，可是明文哦
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
//更新密码，这个phone本来想的是，用户提交的时候自动的从它的token中去进行获取
async function updatePassword (phone, currentPassword, newPassword) {
  const user = await db.User.findOne({ where: { phone } })
  if (!user) {
    throw 'User not found'
  }

  if (!bcrypt.compareSync(currentPassword.toString(), user.hash)) {
    throw 'Current password is incorrect'
  }
  user.hash = await bcrypt.hashSync(newPassword.toString(), 10)
}

//目前没有验证码功能，后续有待开发，这个是更改电话号码功能
async function updatePhone (phone, newPhone) {
  const user = await db.User.findOne({ where: { phone } })

  if (!user) throw 'User not found'
  const existingUser = await db.User.findOne({ where: { phone: newPhone } })
  if (existingUser) throw 'Phone number' + newPhone + 'is already taken'

  user.phone = newPhone
  await user.save()
}

