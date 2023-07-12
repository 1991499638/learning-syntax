import getConfig from 'next/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './userdb'
import { serverRuntimeConfig } from '../../../next.config'

export const courseRepo = {
  updateETHCourseStatus
}



async function updateETHCourseStatus (phone, index) {
  try {
    const course = await db.Course.findOne({ where: { phone } })
    console.log(course, '修改前NNNNNNNNNNNNNNNNN')
    if (!course) {
      throw new Error('Course in not exsist')
    }
    //深拷贝的问题
    const ETHcourseArray = JSON.parse(JSON.stringify(course.dataValues.ETHcourse))
    if (!Array.isArray(ETHcourseArray)) {
      throw new Error('Invalid ETHcouse value. Expected an array')
    }
    ETHcourseArray[index] = 1
    console.log(ETHcourseArray, 'eeeeeeeeeeeeeeeee')

    //await db.Course.update({ ETHcourse: JSON.stringify(ETHcourseArray) }, { where: { phone } })
    course.setDataValue('ETHcourse', ETHcourseArray)
    await course.save()
    console.log(course, '修改后nnnnnnnnnnnnnnn')

    console.log(`Updated ETHcourse status for user ${phone} at index ${index}`)
  } catch (error) {
    console.error(`Error updating ETHcourse status :${error}`)
  }
}