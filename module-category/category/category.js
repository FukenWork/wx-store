import { storeService } from '../../services/services.js';
import { GOODS_LIST } from '../../config/constants.js';
const app = getApp();
Page({
  data: {
    list: GOODS_LIST,
    TabCur: 0,
    goodsList: [],
    page: 1,
    size: 6
  },
  onLoad() {
    this.getInit();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  async getInit() {
    const data = await storeService.getGoodslistByPageAble(+this.data.page, +this.data.size);
    if (data) {
      this.setData({
        goodsList: data.list
      })
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/module-category/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  }
})