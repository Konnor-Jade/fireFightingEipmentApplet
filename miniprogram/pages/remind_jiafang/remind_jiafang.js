const font = require('../../utils/font.js')
// const util = require('../../utils/util.js')
var t=new Date();
var nextmonth=t.getMonth()+2//获取下个月
var thisday= t.getDate()//获取当前日(1-31)
var thisyear=t.getYear();//获取当前年份
var thisdate=t.toLocaleDateString()//获取当前日期
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routineDate:'',
    endtime:'',
    coutday:'',
    name:''

  },
 // 动态加载字体
  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    font.loadFont(); //下载字体
   //倒计时
   var that=this;
    that.countDown();
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
  //获取routineDate
  // getday: function () {
  //    var that=this;
  //     wx.cloud.callFunction({
  //       name: "companyQuery",
  //       data: {
  //         name:"我是你爹",
  //       }
  //     }).then(res => {

  //       console.log(res)

  //       that.setData({
  //      routineDate:res.result.companyInfo.routineDate
  //     })
  //     //  console.log(cpncards);
  //       console.log("已获得"+this.data.coutineDate)
  //     })
  // },



  // 倒计时
  countDown:function(){
    var that=this;
    wx.cloud.callFunction({
      name: "companyQuery",
      data: {
        companyName:"我是你爹",
      }
    }).then(res => {
      console.log(res)
      that.setData({
      routineDate:res.result.companyInfo.routineDate
    })
    //  console.log(cpncards);
      console.log("已获得"+this.data.coutineDate)
    })


    if(thisday<this.data.routineDate)
    {
      this.setData({
      coutday:this.data.routineDate-thisday
      })
      console.log(coutday)
    }
else{
     var kssj=thisdate;
     var jssj=thisyear+"-"+nextmonth+"-"+routineDate;
     var temp_kssj=new Date(kssj.replace(/-/g,"/"));
     var temp_jssj=new Date(jssj.replace(/-/g,"/"));
     var day=parseInt(temp_jssj.getTime()-temp_kssj.getTime()/(1000*60*60*24));
    console.log(day);
    this.setData({
      coutday:this.data.day
      })
      console.log(coutday)
}
    // 每1000ms刷新一次
    if (time>0){
      that.setData({
        countDown: true
      })
      setTimeout(this.countDown,12*60*60*1000);
    }else{
      that.setData({
        countDown:false
      })
    }
  },

})