import { storeService } from '../../services/services.js';
import { GOODS_LIST } from '../../config/constants.js';
import { compare } from '../../utils/util.js';
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
    });
    this.sortCategory(e.currentTarget.dataset.id, this.data.goodsList);
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
  },
  sortCategory(id, arr) {
    // 按照时间进行排序
    if(id === 2) {
      arr.sort(compare('time'));
    }
    // 按照价格进行排序
    if (id === 3) {
      arr.sort(compare('price'));
    }
    // 按照销量进行排序
    if(id ===4) {
      arr.sort(compare('count'));
    }
  }
})