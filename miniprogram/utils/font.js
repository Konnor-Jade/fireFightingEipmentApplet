// 加载字体
var loadFont = function(){
  
  wx.loadFontFace({
    family: 'clockfamily',// 自定义字体的名字 随便起就可以
    source: 'url("https://7465-test-fireprevention-1302718288.tcb.qcloud.la/font/Slidefu-Regular.TTF?sign=8fc56747e788f098e842b448921f8a1a&t=1597370494")',//这里填写第二步获取的下载地址

    global:true,
    success: function(e){
      console.log('字体调用成功')
    },
    fail: function (e) {
      console.log('字体调用失败')
    },
  })
  wx.loadFontFace({
    family: 'titlefamily',// 自定义字体的名字 随便起就可以
      source: 'url("https://7465-test-fireprevention-1302718288.tcb.qcloud.la/font/FZYanSJW_Zhong.TTF?sign=36d167e93125cc1f335194a8821ef9e3&t=1597132533")',//这里填写第二步获取的下载地址

    global:true,
    success: function(e){
      console.log('字体调用成功')
    },
    fail: function (e) {
      console.log('字体调用失败')
    },
  })

}
module.exports = {
  loadFont: loadFont
};