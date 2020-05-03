import { showErrorToast } from '../../utils/util.js';
import EventKeys from '../../common/event-keys';
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    modalName: {
      type: String,
      value: 'ChooseModal'
    },
    modalShare: {
      type: Boolean,
      value: false
    },
    modalCar: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    price: {
      type: String,
      value: ''
    },
    goodsImg: {
      type: String,
      value: ''
    },
    goodsName: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1,
    minusStatus: 'disable'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    sure() {
      if (this.data.modalCar) {
        showErrorToast('添加购物车成功');
        let arr = wx.getStorageSync(EventKeys.ADD_SHOPPING_CAR) || [];
        let data = {}
        // 图片
        data.img = this.properties.goodsImg;
        // 单价
        data.price = this.properties.price;
        // 名称
        data.goodsName = this.properties.goodsName;
        // 总数量
        data.num = this.data.num;
        // 库存
        data.count = this.data.count;
        // 总价格
        data.allPrice = this.data.num * +this.data.price;
        let obj = arr.find(e => e.img === data.img);
        if (obj) {
          data.num = this.data.num + obj.num;
          data.allPrice = data.allPrice + (+obj.allPrice);
          // 将之前的删除掉
          let index = arr.findIndex(e => e.img === data.img);
          arr.splice(index, 1);
        }
        arr.push(data);
        wx.setStorageSync(EventKeys.ADD_SHOPPING_CAR, arr);
        // 通知组件刷新数据
        this.triggerEvent('refreshData', true)
      }
      this.setData({
        modalName: null,
        modalShare: false,
        modalCar: false
      });
    },
    hideModal(e) {
      this.setData({
        modalName: null,
        modalShare: false,
        modalCar: false
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    bindMinus: function () {
      let num = this.data.num;
      if (num > 1) {
        num--;
      }
      let minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    },
    /*点击加号*/
    bindPlus: function () {
      let num = this.data.num;
      num++;
      let minusStatus = num > 1 ? 'normal' : 'disable';
      if (minusStatus > this.properties.count) {
        showErrorToast('超出库存');
        return
      }
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    },
    /*输入框事件*/
    bindManual: function (e) {
      let num = e.detail.value;
      let minusStatus = num > 1 ? 'normal' : 'disable';
      if (e.detail.value > this.properties.count) {
        showErrorToast('超出库存');
        return
      }
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    }

  }
})