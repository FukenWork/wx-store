

Page({
  data: {},
  onLod() {
    // 支付之前先获取订单号再调用微信支付接口
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  }
})