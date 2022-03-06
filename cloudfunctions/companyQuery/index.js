/**
 * 返回公司除members（成员信息）外的所有信息
 * • companyName：公司名称
 * 返回值：一个对象，公司除members（成员信息）外的所有信息
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var company
  await db.collection("companyList")
    .where({
      companyName: event.companyName
    }).field({
      _id: true,
      companyInfo: true,
      companyName: true,
      level: true,
      relation: true
    }).get().then(res => {
      console.log(res)
      company = res.data[0]
    })
  return company
}