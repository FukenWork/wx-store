import EventKeys from '../../common/event-keys.js';
import { showErrorToast } from '../../utils/util.js';
const app = getApp();

Page({
  data: {
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0
    },
    isEditCart: false,
    checkedAllStatus: false,
    editCartList: []
  },
  onShow() {
    this.setData({
      cartGoods: wx.getStorageSync(EventKeys.ADD_SHOPPING_CAR),
    });
    this.setData({
      cartTotal: this.data.cartTotal,
    })
  },
  getCartList: function() {
    let that = this;
    that.setData({
      checkedAllStatus: that.isCheckedAll()
    });
    // });
  },
  isCheckedAll: function() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    if (!this.data.isEditCart) {
      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
      showErrorToast('请点击编进行操作');
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function(element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }
        return element;
      });
      let arr = tmpCartData.filter(e=>e.checked === true);
      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': arr.length
      });
    }
  },
  getCheckedGoodsCount: function() {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    return checkedGoodsCount;
  },
  checkedAll: function() {
    let that = this;
    if (!this.data.isEditCart) {
      let productIds = this.data.cartGoods.map(function(v) {
        return v.product_id;
      });
      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
      showErrorToast('请点击编辑进行操作');
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function(v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': tmpCartData.length
      });
    }

  },
  editCart: function() {
    let that = this;
    if (this.data.isEditCart) {
      let arr = this.data.cartGoods.filter(e=>e.checked === true);
      let sum = arr.reduce((pre, cur) => {
        return pre + cur.allPrice
      }, 0);
      this.data.cartTotal.checkedGoodsAmount = sum;
      this.setData({
        isEditCart: !this.data.isEditCart,
        cartTotal: this.data.cartTotal
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  /**
   * 数量减一
   */
  cutNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.num - 1 > 1) ? cartItem.num - 1 : 1;
    cartItem.num = number;
    cartItem.allPrice = number * +(cartItem.price);
    this.setData({
      cartGoods: this.data.cartGoods
    });
  },
  /**
   * 增加数量
   */
  addNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.num + 1;
    cartItem.allPrice = number * +(cartItem.price);
    cartItem.num = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
  },
  checkoutOrder: function() {
    //获取已选择的商品
    let that = this;
    var checkedGoods = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    if (checkedGoods.length <= 0) {
      showErrorToast('请点击编辑添加勾选');
      return false;
    }
    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },
  deleteCart: function() {
    //获取已选择的商品
    let that = this;
    let productIds = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    if (productIds.length <= 0) {
      return false;
    }
    productIds = productIds.map(function(element, index, array) {
      if (element.checked == true) {
        return element.product_id;
      }
    });
    that.setData({
      checkedAllStatus: that.isCheckedAll()
    });
    // });
  }
})