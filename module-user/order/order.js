import { ORDER_LIST } from  '../../config/constants.js'; 
Page({
  data: {
    orderList: ORDER_LIST,
    TabCur: 0,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
})