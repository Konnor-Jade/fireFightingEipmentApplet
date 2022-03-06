// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点击现实是否订阅消息
  btn() {
    wx.requestSubscribeMessage({
      tmplIds: ['dD6qreqBVnloaGUVp7-eKaASyaYi0BuEVdhyNcv2zBY',"dD6qreqBVnloaGUVp7-eKWHUmdScatf7C7Wj-GZrV_g"],
      success(res) {
        console.log(res)
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  send(){
    wx.cloud.callFunction({
      name:"send",
    }).then(res=>{
      console.log(res)
    }).catch(er=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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