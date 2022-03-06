/*
* 用于判断此人是否是管理员
* 传入参数：无
* 返回值：bool
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
  var position
  await db.collection('companyList')
  .where({
    'members._openid':wxContext.OPENID
  }).field({
    'members.$':true
  }).get()
  .then(res=>{
    console.log(res)
    position=res.data[0].members[0].position
  }).catch(err=>{
    console.log(err)
  })
  return position
}