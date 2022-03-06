/**
 * 项目管理员创建下属公司
 * 传入参数：
 * • companyName：本公司名称
 * • newCompanyName：新公司名称
 * • level：2或者3，2表示是母公司的合作公司，3表示甲方公司
 * • companyIntro：公司简介（可选）
 * • companyContent：具体内容（可选）
 * 返回值：以数组的形式返回五个管理员密码（注册码），可用于管理员注册，每个码可用一次，创建失败则返回空数组 [ ]
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
  //判断新公司是否已经存在
  var total
  await db.collection('companyList')
    .where({
      companyName: event.newCompanyName
    }).count()
    .then(res => {
      console.log("已经存在同名公司", res.total, "家")
      total = res.total
    })
  if (total != 0) {
    return "此公司已存在，请检查是否出现重名错误"
  }
  //获取本公司id
  var old_id
  await db.collection('companyList')
    .where({
      companyName: event.companyName
    }).get()
    .then(res => {
      console.log(res)
      old_id = res.data[0]._id
    })
  //生成新Num个管理员密码
  var admin = []
  var code = []
  for (let i = 0; i < event.adminNum; i++) {
    code.push(randomWord())
    admin.push({
      code: code[i],
      position: "管理员"
    })
  }
  console.log(event.adminNum, "个管理员的密码为", code)

  //添加新公司的信息
  var new_id
  await db.collection('companyList')
    .add({
      data: {
        companyName: event.newCompanyName,
        level: event.level,
        companyInfo: {
          companyIntro: event.companyIntro,
          companyContent: event.companyContent,
          creationDate: db.serverDate(),
          startDate: event.startDate,
          endDate: event.endDate,
          routineDate:event.routineDate
        },
        members: admin,
        relation: {
          cooperators: [],
          customers: [],
          parentCompany: {
            company_id: old_id,
            companyName: event.companyName
          }
        }
      }
    }).then(res => {
      console.log(res)
      new_id = res._id
    })

  //更新上级公司的公司关系数组
  //根据新公司的level判断添加到哪一个关系数组中
  if (event.level == 2) {
    await db.collection("companyList")
      .where({
        companyName: event.companyName
      }).update({
        data: {
          'relation.cooperators': _.push({
            each: [{
              company_id: new_id,
              companyName: event.newCompanyName
            }],
            sort: {
              companyName: 1,
            }
          })
        }
      }).then(res => {
        console.log("更新了", res.total, "条数据")
      })
  } else {
    await db.collection("companyList")
      .where({
        companyName: event.companyName
      }).update({
        data: {
          'relation.customers': _.push({
            each: [{
              company_id: new_id,
              companyName: event.newCompanyName
            }],
            sort: {
              companyName: 1,
            }
          })
        }
      }).then(res => {
        console.log("更新了", res.total, "条数据")
      })
  }

  var company
  await db.collection("companyList").doc(new_id)
    .get().then(res => {
      console.log("新公司数据为：", res)
      company = res.data
    })
  return {
    code: code,
    company: company
  }
}

/**
 * 生成随机的由字母数字组合的字符串
 */

function randomWord() {

  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var nums = "";

  for (var i = 0; i < 6; i++) {

    var id = parseInt(Math.random() * 35);

    nums += chars[id];

  }
  return nums
}