export default {
  data() {
    return {
      value: '',
      value1: '',
      minDate: new Date(2020, 0,1),
      maxDate: new Date(2025, 9,1),
      currentDate: new Date(), 
     
  
    };
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }else if (type === 'day') {
        return `${value}日`;
      }
      return val;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  
  },
};
const util = require('../../utils/util.js')
Page({

 
  /**
   * 页面的初始数据
   */
  data: {
    show:'',
    show1:'',
    name: '',
    sysname:'',
    headsysname:'',
    value1: 1,
    value2: 1,
    valuecompanyname:'',
    valueworkdate:'',
    fileid:''
  },
// uploadfile(){
//   var that = this;
//   var openid = app.globalData.openid || wx.getStorageSync('openid');
//   wx.chooseImage({
//         // 可以指定是原图还是压缩图，默认二者都有
//          sizeType: ['original', 'compressed'], 
//  //可以指定来源是相册还是相机，默认二者都有
//     sourceType: ['album', 'camera'],
  
//     success: function (res) {
//       wx.showLoading({
//         title: '上传中',
//       });
//       //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//       let filePath = res.tempFilePaths[0];
//       const name = Math.random() * 1000000;
//       const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
//       wx.cloud.uploadFile({
//         cloudPath,//云存储图片名字
//         filePath,//临时路径
//         success: res => {
//           console.log('[上传图片] 成功：', res)
//           that.setData({
//             bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
//           });
//           let fileID = res.fileID;
//           //把图片存到users集合表
//           const db = wx.cloud.database();
//             db.collection("companyList").add({
//               data: {
//                 companyContent: fileID
//               },
//               success: function () {
//                 wx.showToast({
//                   title: '图片存储成功',
//                   'icon': 'none',
//                   duration: 3000
//                 })
//               },
//               fail: function () {
//                 wx.showToast({
//                   title: '图片存储失败',
//                   'icon': 'none',
//                   duration: 3000
//                 })
//               }
//             }); 
//         },
//          fail: e => {
//           console.error('[上传图片] 失败：', e)
//         },
//         complete: () => {
//           wx.hideLoading()
//         }
//       });
//     }
//   })
// },
  handleChange1 ({ detail }) {
    this.setData({
        value1: detail.value
    })
},

handleChange2 ({ detail }) {
    this.setData({
        value2: detail.value
    })
},

  click(e){
    console.log(e)  // 打印一下事件对象
 },

 formSubmit(e) {
  console.log('form发生了submit事件，携带数据为：', e.detail.value)
 
    wx.cloud.callFunction({
      name: "companyAdd",
      data: {
        companyName: "广东安顺消防建设",
        newCompanyName: e.detail.value.companyname,
        adminNum:e.detail.value.managernum,
        startDate:e.detail.value.start_date,
        endDate:e.detail.value.end_date,
        routineDate:e.detail.value.routine,
        level: 3,
        companyIntro: "公司简介（可选）",
        companyContent: e.detail.value.fileid
      }
    }).then(res => {
      console.log(res)
    })
  
},


  onInput(event) {
    var newTime = new Date(event.detail);
    if(this.data.show==0){
      newTime =null;
    }else{
      //console.log(event.detail);
      newTime = util.formatTime1(newTime);
    }
    this.setData({
      currentDate: event.detail,
      start_date: newTime,
    });
  },
  onInput1(event) {
    var etime = event.detail+(86400-1)*1000;
    var newTime = new Date(etime);
    if (this.data.show1 == false) {
      newTime = null;
    } else {
      //console.log(event.detail);
      newTime = util.formatTime1(newTime);
    }

    //console.log(newTime);
    this.setData({
      currentDate1: event.detail,
      end_date: newTime,
     // key1:1,
    });
  },
//时间-弹出框
showPopup() {
  this.setData({ key: 1 });
  this.setData({ show: true });
 
},
//时间-弹出框
showPopup1() {
  this.setData({ key1: 1 });
  this.setData({ show1: true });

},
//时间-弹出框关闭
onClose() {
  this.setData({ show: false });
  this.setData({ show1: false });
},
// 时间-确定按钮
confirmFn(e) {
  var newTime = new Date(e.detail);
  newTime =util.formatTime1(newTime);
  this.setData({ start_date: newTime });
 //console.log(e.detail);
  this.setData({ show: false });

},
// 时间-确定按钮
confirmFn1(e) { 
  var newTime = new Date(e.detail);
  newTime =util.formatTime1(newTime);
  this.setData({ end_date: newTime });
  this.setData({ show1: false });
},
// 时间-取消按钮
cancelFn() { 
  this.setData({ show: false });
  this.setData({ show1: false });
},
// load(){

  uploadfile: function(){
    var that = this
  wx.chooseMessageFile({
      count: 1,//能选择文件的数量
      type: 'file',//能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) {
        //文件临时路径
        const tempFilePaths = res.tempFiles[0].path
		//后缀名的获取
        const houzhui = tempFilePaths.match(/\.[^.]+?$/)[0];
		//存储在云存储的地址
        const cloudpath = 'word/' + new Date().getTime() + houzhui;
        //获取fileID
        const uploadTask= wx.cloud.uploadFile({
          cloudPath: cloudpath,
          filePath: tempFilePaths,
          success: res => {
            //存储fileID，之后用的到
            that.setData({
              fileid:res.fileID
            })

            // this.setData({
            //   fileid:res.fileID
            // })
           
          },
          fail: err => {
            console.log(err)
          },
        })
        
        
    uploadTask.onProgressUpdate((res) => {
      wx.showLoading({
          mask: true,
          title: '' + res.progress,
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  }
  )


      
       

      }
      
    })
  },
  

  openfile:function(){
    var fileid = this.data.fileid;
    var that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        that.setData({
        //res.fileList[0].tempFileURL是https格式的路径，可以根据这个路径在浏览器上下载
          imgSrc: res.fileList[0].tempFileURL
        });
        //根据https路径可以获得http格式的路径(指定文件下载后存储的路径 (本地路径)),根据这个路径可以预览
        wx.downloadFile({
          url: that.data.imgSrc,
          success: (res) => {
            that.setData({
              httpfile: res.tempFilePath
            })
            //预览文件
            wx.openDocument({
              filePath: that.data.httpfile,
              success: res => {
                console.log("打开OK");
              },
              fail: err => {
                console.log(err);
              }
            })
          },
          fail: (err) => {
            console.log('读取失败', err)
          }
        })
      },
      fail: err => {
		console.log(err);
      }
    })
    
  },



//     wx.cloud.callFunction({
//       name: "regist",
//       data: {
//         code: "123456",
//         name: "阿辰",
//         phone: '111111',
//       }
//     }).then(res => console.log(res))

  
//     wx.cloud.callFunction({
//       name: 'getPositon',
//       data: {
//         companyNmae: "广东安顺消防建设"
//       }
//     }).then(res => {
//       console.log(res)
//       this.setData({
//         admin: res.result
//       })
//     })
 
 
//     wx.cloud.callFunction({
//       name: "memberaAdd",
//       data: {
//         //仅仅可以填写维保员或者管理员
//         position: "管理员"
//       }
//     }).then(res => {
//       console.log(res)
//       this.setData({
//         invitCode: res.result.invitCode
//       })
//     })



//     wx.cloud.callFunction({
//       name: "companyQuery",
//       data: {
//         companyName: "广东安顺消防建设"
//       }
//     }).then(res => {
//       console.log(res)
//     })



//     wx.cloud.callFunction({
//       name: "membersQuery",
//       data: {
//         companyName: "广东安顺消防建设"
//       }
//     }).then(res => {
//       console.log(res)
//     })


//     wx.cloud.callFunction({
//       name: "companyAdd",
//       data: {
//         companyName: "广东安顺消防建设",
//         newCompanyName: "卢卡斯的积分",
//         level: 2,
//         companyIntro: "公司简介（可选）",
//         companyContent: "具体内容（可选）"
//       }
//     }).then(res => {
//       console.log(res)
//     })

// },
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

})
