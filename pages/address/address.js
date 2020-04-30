import { storeService } from '../../services/services.js'

Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    page: 1,
    list: [],
    next: ' ',
    toDetail: false,
    showModal: false,
    item: {},
  },
  async onLoad() {
    await this.getInitData();
  },
  touchE: function (e) {
    this.setData({
      item: e
    });
    let that = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = that.data.startX - endX;
      let delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      let index = e.currentTarget.dataset.index;
      let list = that.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({ list: list });
    }
  },
  /**
   * 手指触摸动作开始 记录起点X坐标
   * @param {*} e
   */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    });
  },
  /**
   * 滑动事件处理
   * @param {*} e
   */
  touchmove: function (e) {
    let that = this,
      //当前索引
      index = e.currentTarget.dataset.index,
      //开始X坐标
      startX = that.data.startX,
      //开始Y坐标
      startY = that.data.startY,
      //滑动变化坐标
      touchMoveX = e.changedTouches[0].clientX,
      //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false;
        else //左滑
          v.isTouchMove = true;
      }
    })
    //更新数据
    that.setData({ list: that.data.list })
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    let _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 点击删除弹出
   * @param {*} e
   */
  delBtn(e) {
    let time = e.currentTarget.dataset.item.generatedTime;
    this.setData({
      showModal: true,
      generatedTime: time,
    });
  },
  onCancel() {
    this.setData({ showModal: false })
    this.touchstart(this.data.item);
  },
  onShareAppMessage() {
    return shareMiniApp(this)
  },
  /**
   * 获取个人的历史记录信息
   * @param {*} next
   */
  async getInitData() {
    wx.showLoading();
    let data = await storeService.getUserAddresssList('11111');
    this.setData({
      list: data
    });
    wx.hideLoading();
  },
  /**
   * 删除点击
   */
  async onConfirm() { },
  onShareAppMessage() {
    return shareMiniApp(this)
  },
  onShow() {

  },
  /**
   * 进入详情页面
   * @param {*} e
   */
  async godetail(e) {

  },
  /**
   * 下拉刷新
   * @param {*} e
   */
  async onReachBottom(e) { }

})