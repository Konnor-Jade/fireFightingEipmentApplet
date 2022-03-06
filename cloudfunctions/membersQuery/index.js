/**
 * 返回公司所有members信息
 * • companyName：公司名称
 * 返回值：公司所有成员信息，一个对象数组
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

  var members
  await db.collection("companyList")
    .where({
      companyName: event.companyName
    }).field({
      members:true
    }).get().then(res => {
      console.log(res)
      members = res.data[0]
    })
  return members
}