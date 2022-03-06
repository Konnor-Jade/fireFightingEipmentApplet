/**
 * 用于管理员添加本公司的成员或者管理员，生成一个密码（注册码），使用前请先判断此用户是否是本公司管理员，返回的密码仅可供一个用户注册一次
 * 传递参数：
 * position:职位
 * 返回值：{
 *        code :可以用于新成员注册的密码，一次性使用
 *        positon：职位
 *        }
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
  var invitCode = randomWord()
  await db.collection("companyList")
    .where({
      'members._openid': wxContext.OPENID
    }).update({
      data: {
        members: _.push({
          each: [{
            code: invitCode,
            position: event.position
          }],
          sort: {
            position: 1,
          }
        })
      }
    }).then(res => {
      console.log(res)
      if (res.stats.updated == 0) {
        invitCode = ''
      }
    })
    if(invitCode==''){
      return {}
    }
    return {
      invitCode:invitCode,
      positon:event.position
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
  return nums;
}