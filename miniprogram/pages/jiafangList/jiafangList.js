Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    active:1,
    cpncards:[]
    
  },
  
  onSearch(e) {
    this.setData({
      value: e.detail,
    });
    // Toast('搜索' + this.data.value);
    console.log(this.data.value)
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.loadcpn()
     this.loadFontFace()
  },
  onReachBottom: function () {
    this.loadcpn()
    this.loadFontFace()
  },
  // 动态加载字体
  loadFontFace() {    
    const self = this
    wx.loadFontFace({
      family: 'titlefamily',// 自定义字体的名字 随便起就可以
      source: 'url("https://7465-test-fireprevention-1302718288.tcb.qcloud.la/font/FZYanSJW_Zhong.TTF?sign=36d167e93125cc1f335194a8821ef9e3&t=1597132533")',//这里填写第二步获取的下载地址
      success(res) {
        console.log(res.status)
        self.setData({ loaded: true })
      },
      fail: function(res) {
        console.log(res.status)
      },
      complete: function(res) {
       console.log(res.status)
      }
    });
  },
  //获取数据库的公司名称和两个时间
  loadcpn: function () {
    let old_data = this.data.cpncards;
    console.log(old_data)
      wx.cloud.callFunction({
        name: "getCompanyList",
        data: {
          level: 3,
        }
      }).then(res => {
        console.log(res)
        
        this.setData({
       cpncards:old_data.concat(res.result)
      
      })
      //  console.log(cpncards);
        console.log(this.data.cpncards)
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
  gotoaddjiafang:function(){
    wx.navigateTo({
      url: '../head_add_one/head_add_one',
    })
  },
  gotocoprt:function(){
    wx.redirectTo({
      url: '../coprtcpn/coprtcpn',
    })
  }
})