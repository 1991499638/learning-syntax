import getConfig from 'next/config'
import mysql from 'mysql2/promise'
import { Sequelize, DataTypes } from 'sequelize'


const { serverRuntimeConfig } = getConfig()

export const db = {
  initialized: false,
  initialize
}

//初始化数据库
async function initialize () {
  // 如果该数据库不存在的话 先进行数据库的创建
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig
  const connection = await mysql.createConnection({ host, port, user, password })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)


  //对数据库进行连接
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
  try {
    await sequelize.authenticate()
    console.log('Connection has been establish successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  //初始化并且添加对象
  db.User = userModel(sequelize)

  //与数据库进行同步
  await sequelize.sync({ alter: true })

  //
  //改变数据库的状态
  db.initialized = true


  //
}

function userModel (sequelize) {
  const attributes = {
    phone: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.BLOB, allowNull: true },
  }


  const options = {
    defaultScope: {
      attributes: { exclude: [] }
    },
    scopes: {
      withHash: { attributes: {} }
    }
  }




  return sequelize.define('User', attributes, options)

}