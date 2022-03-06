// 用户第一次注册时使用，会绑定用户的openid、姓名、电话、注册日期、职位
// 传入的参数：
// • name：姓名
// • phone：电话
// • position：职位
// 返回整个人员信息
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// const $ = db.command.aggregate()
// 云函数入口函数
// • name：姓名
// • phone：电话
// • position：职位
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const name = event.name
  const phone = event.phone
  const position = event.position
  //注册数据
  var updated
  await db.collection('companyList').where({
    'members.code': event.code,
  }).update({
    data: {
      'members.$._openid': openid,
      'members.$.code': _.remove(),
      'members.$.name': name,
      'members.$.phone': phone,
      'members.$.registDate': db.serverDate()
    }
  }).then(res => {
    console.log('更新 ', res.stats.updated, ' 条数据')
    updated = res.stats.updated
  })
  
  //更新成功，返回用户的信息，一个对象
  if (updated == 1) {
    console.log("用户注册成功")
    var member
    await db.collection('companyList')
      .where({
        'members._openid': openid
      }).field({
        _id: false,
        'members.$': true
      }).get().then(res => {
        console.log(res.data[0].members[0])
        member = res.data[0].members[0]
      })
    return member
  }
  return null
}