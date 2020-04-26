
const app =  getApp();
const page = {
  data: {
    userInfo:{}
  },
  onLoad() {
    console.log(app.globalData.userInfo)
    this.setData({userInfo: app.globalData.userInfo})
  }
}

export default Page(page)