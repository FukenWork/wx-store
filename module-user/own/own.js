import { storeService } from '../../services/services.js';
import wxApi from '../../utils/wx-api';
import EventKeys from '../../common/event-keys';

const app = getApp();
const page = {
  data: {
    userInfo: {},
    code: ''
  },
  async onLoad() {
    this.getUser();
  },
  async onUserInfoClick() {
    // 获取授权信息
    let data = await wxApi.getSetting();
  },
  async getUserInfo() {
    let code = await wxApi.login();
    let data = await wxApi.getUserInfo();
    console.log(data.userInfo)
    if (data.errMsg === 'getUserInfo:ok') {
      // 微信三方登录
      this.setData({ userInfo: data.userInfo });
      let dataInfo = await storeService.wxlogin(code.code, data.userInfo.nickName, data.userInfo.gender);
      if (dataInfo) {
        wx.setStorageSync(EventKeys.SAVE_USERINFO, Object.assign({ user: data.userInfo }, { dataInfo }));
        this.setData({showBtn: false})
      }
    }
  },
  // 获取缓存中的信息
  getUser() {
    let userInfo = wx.getStorageSync(EventKeys.SAVE_USERINFO);
    if (userInfo) {
      console.log(userInfo);
      this.setData({
        userInfo: userInfo.user,
        showBtn: false
      })
    } else {
      this.setData({ showBtn: true })
    }
  }
}

export default Page(page)