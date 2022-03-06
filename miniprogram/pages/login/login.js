//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  // data: {
  //   avatarUrl: './user-unlogin.png',
  //   userInfo: {},
  //   logged: false,
  //   takeSession: false,
  //   requestResult: ''
  // },

  // onLoad: function() {
  //   if (!wx.cloud) {
  //     wx.redirectTo({
  //       url: '../chooseLib/chooseLib',
  //     })
  //     return
  //   }

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.setData({
  //               avatarUrl: res.userInfo.avatarUrl,
  //               userInfo: res.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },
data:{
  name:'',
  logikey:'',
  telephnum:'',
  veriticode:'',
  multiArray: [['甲方公司', '合作消防公司','总公司'], ['剑桥', '东晟公馆', '东莞通', '华为', '寮步政府'], ['管理员', '维保员']],
  objectMultiArray: [ 
    [
    {
      id: 0,
      name: '甲方公司'
    },
    {
      id: 1,
      name: '合作消防公司'
    },
    {
      id: 2,
      name: '总公司'
    }
  ], [
    {
      id: 0,
      name: '剑桥'
    },
    {
      id: 1,
      name: '东盛公馆'
    },
    {
      id: 2,
      name: '东莞通'
    },
    {
      id: 3,
      name: '华为'
    },
    {
      id: 3,
      name: '寮步政府'
    }
  ], [
    {
      id: 0,
      name: '管理员'
    },
    {
      id: 1,
      name: '维保员'
    }
  ]
],
multiIndex: [0, 0, 0]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['剑桥', '东晟公馆', '东莞通', '华为', '寮步政府'];
            data.multiArray[2] = ['管理员', '维保员'];
            break;
          case 1:
            data.multiArray[1] = ['A消防', 'B消防', 'C消防'];
            data.multiArray[2] = ['管理员', '维保员'];
            break;
            case 2:
              data.multiArray[1] = ['广东安顺消防建设'];
              data.multiArray[2] = ['管理员', '维保员'];
              break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['管理员', '维保员'];
                break;  case 1:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
              case 2:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
              case 3:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
              case 4:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
              case 1:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
              case 2:
                data.multiArray[2] = ['管理员', '维保员'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.setData({
          openid: res.result.openid,
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e){
    console.log('form发生了submit事件，数据为：',e.detail.value)
  },
  // getname(e){
  //   var val=e.detail.value;
  //   console.log(val)
  //   this.setData({
  //     name:val
  //   });
  // },

  crewAdd(e) {
   
    db.collection("crewList")
    .count()
    .then(res=>{
      console.log(res.total)
    })
 var val=e.detail.value;
    console.log(val)
    this.setData({
      name:val
    });
    wx.cloud.callFunction({
      name:'crewAdd',
      data:{
        _openid:this.data.openid,
        nickName:this.data.name,
        
        registDate:new Date(),
      }
    }).then(res=>{
      console.log(res)
    })
  }
 


})
