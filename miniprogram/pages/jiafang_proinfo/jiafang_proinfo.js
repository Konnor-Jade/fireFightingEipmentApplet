Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    fileid:'',
    httpfile:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfileid()

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
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  // 在数据库获取公司的fileID
    getfileid:function () {
      wx.cloud.callFunction({
        name: "companyQuery",
        data: {
          companyName:"哈哈哈哈哈",
        }
      }).then(res => {
        console.log(res)
        this.setData({
       fileid:res.result.companyInfo.companyContent,
      })
        console.log(this.data.fileid)
        wx.cloud.downloadFile({
          fileID:this.data.fileid,
          // url: that.data.imgSrc,
          success: (res) => {
            this.setData({
              httpfile: res.tempFilePath
            })
            console.log(this.data.httpfile)
            // this.setData({
            //   url:httpfile
            // })
            // console.log(url)
          wx.openDocument({
            filePath: this.data.httpfile,
            success: res => {
              console.log("打开OK");
            },
            fail: err => {
              console.log(err);
            }
          })
        }
        })
      })
  }
  // 打开文档（预下载与打开）
  
    // wx.cloud.callFunction({
    //   name: "companyQuery",
    //   data: {
    //     companyName:"剑桥国际书院",
    //   }
    // }).then(res => {
    //   console.log(res)
    //   // var that = this;
    //   this.setData({
    //  fileid:res.result.companyInfo.companyContent
    
    // })
   
    //   console.log(this.data.fileid)
    // })
    
    // var that = this;
    // wx.cloud.getTempFileURL({
    //   fileList: [fileid],
    //   success: res => {
    //     that.setData({
        //res.fileList[0].tempFileURL是https格式的路径，可以根据这个路径在浏览器上下载
        //   imgSrc: res.fileList[0].tempFileURL
        // });
   
        //根据https路径可以获得http格式的路径(指定文件下载后存储的路径 (本地路径)),根据这个路径可以预览

    //     openfile:function(){
    //         //预览文件
          
    //         wx.openDocument({
    //           filePath: this.data.httpfile,
    //           success: res => {
    //             console.log("打开OK");
    //           },
    //           fail: err => {
    //             console.log(err);
    //           }
    //         })
    //       },
    //       fail: (err) => {
    //         console.log('读取失败', err)
    //       }
    //     })
    //   },
    //   fail: err => {
		// console.log(err);
    //   }
    // })
    
  
 
})


