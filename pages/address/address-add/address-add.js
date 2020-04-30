import { storeService } from '../../../services/services';
import { showErrorToast } from '../../../utils/util';
const app = getApp();
Page({
  data: {
    address: {
      detail: '',
      city: '',
      username: '',
      phone: '',
      is_default: 0
    },
    openSelectRegion: false,
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  bindinputphone(event) {
    let address = this.data.address;
    address.phone = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.username = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.detail = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.is_default = !address.is_default;
    this.setData({
      address: address
    });
  },

  bindRegionChange: function (e) {
    let address = this.data.address;
    this.data.address.provice = e.detail.value[0];
    this.data.address.city = e.detail.value.join('-');
    this.setData({
      address: address
    })
  },

  cancelAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  async saveAddress() {
    let address = this.data.address;
    if (address.username == '') {
      showErrorToast('请输入姓名');
      return false;
    }
    if (address.phone == '') {
      showErrorToast('请输入手机号码');
      return false;
    }
    if (address.city == '') {
      showErrorToast('请输入省市区');
      return false;
    }
    if (address.address == '') {
      showErrorToast('请输入详细地址');
      return false;
    }
    this.data.address.userId = '123';
    let data = await storeService.saveUserAddressInfo(this.data.address);
    if (data) {
      wx.showToast({ title: '添加成功' })
      wx.navigateTo({ url: '/pages/address/address' })
    }
  },
});