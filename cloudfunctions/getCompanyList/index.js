/**
 * 获取指定公司类别的列表
 * 传入参数：
 * • level：需要获取的公司的列表的等级，1表示母公司列表，2表示合作公司列表，3表示甲方公司列表
 * 返回值：一个对象数组每个对象为{ companyName：公司名称
                                startDate：起始时间
                                endDate：结束时间
                              }
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
  var data
  await db.collection("companyList")
  .where({
    level:event.level
  }).field({
    _id:false,
    companyName: true,
    'companyInfo.startDate':true,
    'companyInfo.endDate':true,
    'companyInfo.routineDate':true
  }).get()
  .then(res=>{
    console.log(res.data)
    data = res.data
  })
  return data
}