export function wxPromise(api) {
  function func(options, ...params) {
    return new Promise((resolve, reject) => {
      api(
        Object.assign({}, options, {
          success: (res) => {
            resolve(res)
          },
          fail: reject
        }),
        ...params
      )
    })
  }

  return func
}

export default {
  wxPromise: wxPromise,
  // 界面交互
  showToast: wxPromise(wx.showToast),
  showLoading: wxPromise(wx.showLoading),
  showModal: wxPromise(wx.showModal),

  // 导航条
  setNavigationBarTitle: wxPromise(wx.setNavigationBarTitle),
  setNavigationBarColor: wxPromise(wx.setNavigationBarColor),
  setTopBarText: wxPromise(wx.setTopBarText),
  // 导航
  navigateTo: wxPromise(wx.navigateTo),
  redirectTo: wxPromise(wx.redirectTo),
  switchTab: wxPromise(wx.switchTab),
  reLaunch: wxPromise(wx.reLaunch),

  getSystemInfo: wxPromise(wx.getSystemInfo),
  // 用户相关
  login: wxPromise(wx.login),
  checkSession: wxPromise(wx.checkSession),
  authorize: wxPromise(wx.authorize),
  getUserInfo: wxPromise(wx.getUserInfo),

  // 文件
  uploadFile: wxPromise(wx.uploadFile),

  // 文件
  saveFile: wxPromise(wx.saveFile),

  // 数据缓存
  setStorage: wxPromise(wx.setStorage),
  getStorage: wxPromise(wx.getStorage),
  getStorageInfo: wxPromise(wx.getStorageInfo),
  removeStorage: wxPromise(wx.removeStorage),

  // 转发
  showShareMenu: wxPromise(wx.showShareMenu),
  hideShareMenu: wxPromise(wx.hideShareMenu),
  updateShareMenu: wxPromise(wx.updateShareMenu),
  getShareInfo: wxPromise(wx.getShareInfo),

  // 设置
  openSetting: wxPromise(wx.openSetting),
  getSetting: wxPromise(wx.getSetting)
}