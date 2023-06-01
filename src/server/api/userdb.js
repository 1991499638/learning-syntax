import getConfig from 'next/config'
import mysql from 'mysql2/promise'
import { Sequelize, DataTypes } from 'sequelize'
import { get } from 'js-cookie'

const { serverRuntimeConfig } = getConfig()

export const db = {
  initialized: false,
  initialize
}

// 初始化数据库
async function initialize () {
  // 如果该数据库不存在的话，先进行数据库的创建
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig
  const connection = await mysql.createConnection({ host, port, user, password })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // 对数据库进行连接
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  // 初始化并添加 User 模型
  db.User = userModel(sequelize)

  // 初始化并添加 Course 模型
  db.Course = courseModel(sequelize)

  // 定义关联关系
  db.User.hasOne(db.Course, { foreignKey: 'phone', onDelete: 'CASCADE' })
  db.Course.belongsTo(db.User, { foreignKey: 'phone', onDelete: 'CASCADE' })
  // 同步数据库
  await sequelize.sync({ alter: true })

  // 改变数据库的状态
  db.initialized = true
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
    },
    hooks: {
      afterCreate: async (user, options) => {
        const course = new db.Course({
          phone: user.phone
        })
        await course.save()
      }
    }
  }

  return sequelize.define('User', attributes, options)
}

function courseModel (sequelize) {
  const attributes = {

    phone: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },

    ETHcourse: {
      type: DataTypes.JSON, allowNull: true, defaultValue: () => Array(50).fill(0),
      get () {
        const courses = this.getDataValue('ETHcourse')
        return courses ? JSON.parse(courses) : []
      },
      set (value) {
        if (Array.isArray(value)) {
          this.setDataValue('ETHcourse', JSON.stringify(value))
        } else {
          throw new Error('Invalid ETH courses.Expected an array')
        }
      }
    },

    BTCcourse: {
      type: DataTypes.JSON, allowNull: true, defaultValue: () => Array(50).fill(0),
      get () {
        const courses = this.getDataValue('BTCcourse')
        return courses ? JSON.parse(courses) : []
      },
      set (value) {
        if (Array.isArray(value)) {
          this.setDataValue('BTCcourse', JSON.stringify(value))
        } else {
          throw new Error('Invalid BTC courses.Expected an array')
        }
      }
    },

    Soliditycourse: {
      type: DataTypes.JSON, allowNull: true, defaultValue: () => Array(50).fill(0),
      get () {
        const courses = this.getDataValue('Soliditycourse')
        return courses ? JSON.parse(courses) : []
      },
      set (value) {
        if (Array.isArray(value)) {
          this.setDataValue('Soliditycourse', JSON.stringify(value))
        } else {
          throw new Error('Invalid Soliditycourse.Expected an array')
        }
      },
    },
  }
  const options = {
    defaultScope: {
      attributes: { exclude: [] }
    },
    scopes: {
      withHash: { attributes: {} }
    }
  }

  return sequelize.define('Course', attributes, options)
}
