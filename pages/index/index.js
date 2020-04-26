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
      id: 1,
      type: 'image',
      url: '../../images/banner/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '../../images/banner/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '../../images/banner/4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '../../images/banner/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '../../images/banner/6.jpg'
    }],
    navList: HEADER_NAV_LIST
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
      url: '../search/search',
    })
  }
}

export default Page(page)