// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {

  var date = new Date()
  var today = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
  const wxContext = cloud.getWXContext()

  //发送甲方公司和合作公司的维保提醒
  var member1
  await db.collection('companyList')
    .where({
      level: _.in([1, 2]),
      'members._openid': _.exists(true)
    })
    .field({
      _id: false,
      "members._openid": true
    })
    .get()
    .then(res => {
      member1 = res.data
    }).catch(err => {
      console.log(err)
    })

  var arr1 = []
  member1.forEach((item, index) => {
    // console.log(index, " ", item)
    item.members.forEach((val, idx) => {
      if (val._openid != null) {
        console.log(idx, val._openid)
        arr1.push(val._openid)
      }
    })
  })
  console.log(arr1)
  try {
    arr1.forEach((item, i) => {
      cloud.openapi.subscribeMessage.send({
        touser: item,
        page: "pages/index/index",
        data: {
          date3: {
            value: today
          },
          thing2: {
            value: '请登陆小程序查收维保申请'
          }
        },
        templateId: 'dD6qreqBVnloaGUVp7-eKWHUmdScatf7C7Wj-GZrV_g',
        miniprogramState: 'developer'
      })
    })
  } catch (err) {
    console.log(err)
  }
  /******向甲方公司发送提醒********************************************************* */
  //发送甲方公司和合作公司的维保提醒
  var member2
  await db.collection('companyList')
    .where({
      level: _.in([1, 2]),
      'members._openid': _.exists(true)
    })
    .field({
      _id: false,
      "members._openid": true
    })
    .get()
    .then(res => {
      member2 = res.data
    }).catch(err => {
      console.log(err)
    })

  var arr2 = []
  member2.forEach((item, index) => {
    // console.log(index, " ", item)
    item.members.forEach((val, idx) => {
      if (val._openid != null) {
        console.log(idx, val._openid)
        arr2.push(val._openid)
      }
    })
  })
  console.log(arr2)
  try {
    arr2.forEach((item, i) => {
      cloud.openapi.subscribeMessage.send({
        touser: item,
        page: "pages/index/index",
        data: {
          date3: {
            value: today
          },
          thing2: {
            value: '请进行日常消防设备检修，如有异常，请登陆小程序报修'
          }
        },
        templateId: 'dD6qreqBVnloaGUVp7-eKWHUmdScatf7C7Wj-GZrV_g',
        miniprogramState: 'developer'
      })
    })
  } catch (err) {
    console.log(err)
  }

}