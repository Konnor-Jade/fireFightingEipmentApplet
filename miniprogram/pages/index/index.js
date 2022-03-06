const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.cloud.callFunction({
          name: "getPositon"
        }).then(res => {
          console.log(res)
          if (res.result == null) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else if (res.result == "管理员") {
            app.globalData.position = "管理员"
            wx.redirectTo({
              //这里需要配置管理员界面路径
              url: '../login/login',
            })
          } else {
            app.globalData.position = "维保员"
            wx.redirectTo({
               //这里需要配置维保员页面路径
              url: '../login/login',
            })
          }
        })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },





})