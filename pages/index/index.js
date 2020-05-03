import { HEADER_NAV_LIST } from '../../config/constants.js';
import { addDefaultInterceptor } from './../../utils/http-client';
import wxApi from '../../utils/wx-api';
addDefaultInterceptor();
const page = {
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/banner/1.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '../../images/banner/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '../../images/banner/7.jpg'
    }],
    navList: HEADER_NAV_LIST,
    pageCur: 'basics'
  },
  async onLoad() {
    let code = await wxApi.login();
  },
  choosePath(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item,
    })
  },
  gosearch() {
    wx.navigateTo({
      url: '/module-category/search/search',
    })
  },
  // 点击跳转导航
  navChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    });
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
}

export default Page(page)