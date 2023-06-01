import getConfig from 'next/config'
import mysql from 'mysql2/promise'
import { Sequelize, DataType } from 'sequelize'

const { serverRuntimeConfig } = getConfig()



export const db = {
  initialized: false,
  initialize
}


async function initialize () {
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig
  const connection = await mysql.createConnection({ host, port, user, password })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}`)



  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
  try {
    await sequelize.authenticate()
    console.log(`Connection has been establish successfully`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  //初始化并添加对象
  db.Couorse = courseModel(sequelize)

  await sequelize.sync({ alter: true })

  db.initialize = true
}


function courseModel (sequelize) {
  const attributes = {
    ETHcourse: { type: DataTypes.ARRAY(DataTypes.BOOLEAN), allowNUll: false, defaultValue: Array(100).fill(false) },
    BTCcourse: { type: DataTypes.ARRAY(DataTypes.BOOLEAN), allowNUll: false, defaultValue: Array(100).fill(false) },
    Soliditycourse: { type: DataTypes.ARRAY(DataTypes.BOOLEAN), allowNUll: false, defaultValue: Array(100).fill(false) },
    BlockChainCourse: { type: DataTypes.ARRAY(DataTypes.BOOLEAN), allowNUll: false, defaultValue: Array(100).fill(false) }
  }

  Course.belongsTo(Users, { foreignKey: 'phone', onDelete: 'CASCADE' })

  const options = {
    defaultScope: {
      attributes: { exclude: [] }
    },
    scopse: {
      withHash: { attributes: [] }
    }
  }

  return sequelize.define('Course', attributes, options)
}