import { storeService } from '../../services/services.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {
      price: '12',
      goodsName: 'aaa',
      prePrice: '14',
      typeId: 1,
      curCount: 100,
      saleCount: 11,
      saleState:1,
      advise: true,
      goodsImg: ''
    },
    imgList:[],
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res)
        this.data.goodsInfo.goodsImg = res.tempFiles[0].path;
      }
    });
  },
 async sub() {
   let data = await storeService.saveGoodsInfo(this.data.goodsInfo);
  }
})