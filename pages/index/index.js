import { HEADER_NAV_LIST } from '../../config/constants.js';
import { addDefaultInterceptor } from './../../utils/http-client';
import { storeService } from '../../services/services.js';
import wxApi from '../../utils/wx-api';

addDefaultInterceptor();
const page = {
  data: {
    navList: HEADER_NAV_LIST,
    pageCur: 'basics'
  },
  async onLoad() {
    await this.getInit(1, 3);
    await this.justUserAuth();
    wx.navigateTo({
      url: '/module-user/pay/pay',
    })
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
    // wx.navigateTo({
    //   url: e.currentTarget.dataset.url
    // })
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/module-category/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getInit(page, size) {
    const list = await storeService.getGoodsListInHome(page, size);
    if (list.list.length !== 0) {
      // 根据typeId聚合数组
      let hash = {};
      let i = 0;
      let res = []
      list.list.forEach((e) => {
        let typeId = e.typeId.typeId;
        hash[typeId] ? res[hash[typeId] - 1].value.push(e) : hash[typeId] = ++i && res.push({
          value: [e],
          typeId: e.typeId.typeId,
          name: e.typeId.typeName
        })
      });
      let imgList = list.list.map((e) => {
        let obj = {};
        obj.img = e.goodsImg;
        obj.id = e.id;
        return obj;
      });
      this.setData({
        list: res,
        swiperList: imgList
      });
    }
  },
  // 判断小程序是具有用户信息的权限
  async justUserAuth() {
    let data = await wxApi.getSetting();
    if (!data.authSetting['scope.userInfo']) {
      // 跳转“我的”页面进行用户登录
      wx.navigateTo({
        url: '/module-user/own/own',
      })
    }
    // 如果没有点击小程序主页进入“我的页面”让用户登录
  }
}

export default Page(page)