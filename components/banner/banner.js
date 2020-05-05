
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    swiperList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    goDetail(e) {
      console.log(e);
      wx.navigateTo({
        url: `/module-category/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
