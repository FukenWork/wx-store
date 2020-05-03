import { storeService } from '../../services/services';
import EventKeys from '../../common/event-keys';

const page = {
  data: {
    goodsInfo: {},
  },
  async onLoad(opt) {
    const data = await storeService.findGoodsInfoById(opt.id, '123');
    this.setData({
      goodsInfo: data.obj,
      collect: data.collect,
      id: data.id
    })
  },
  onShow() {
    this.setData({
      shopCount: wx.getStorageSync(EventKeys.ADD_SHOPPING_CAR).length
    })
  },
  refreshData() {
    this.setData({
      shopCount: wx.getStorageSync(EventKeys.ADD_SHOPPING_CAR).length
    })
  },
  goShop() {
    wx.navigateTo({
      url: '/module-category/shop-car/shop-car',
    })
  },
  goHome() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  showModal() {
    this.setData({
      modalName: 'ChooseModal',
      modalShare: true
    })
  },
  openCar() {
    this.setData({
      modalName: 'ChooseModal',
      modalCar: true,
      price: this.data.goodsInfo.prePrice,
      count: this.data.goodsInfo.curCount,
      goodsImg: this.data.goodsInfo.goodsImg,
      goodsName: this.data.goodsInfo.goodsName
    })
  },
  // 收藏
 async collect() {
    let collectInfo = {};
    collectInfo.targetId = this.data.goodsInfo.id;
    collectInfo.userId = '123';
    let data = await storeService.collectGoods(collectInfo);
    this.setData({ collect: true })
  },
  // 取消收藏
 async cancelcollect() {
    let data = await storeService.cancelCollect(this.data.id);
    if(data) {
      this.setData({collect: false})
    }
  }
};

export default Page(page)