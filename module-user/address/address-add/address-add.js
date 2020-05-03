import { storeService } from '../../../services/services';
import { showErrorToast } from '../../../utils/util';
import { REMARK_ADDRESS } from '../../../config/constants';
Page({
  data: {
    address: {
      detail: '',
      city: '',
      username: '',
      phone: '',
      isdefault: false,
      remark: '家庭'
    },
    regionList: [],
    key:0,
    remarkAddress: REMARK_ADDRESS
  },
  onLoad(opt) {
    if (opt.data !== '0') {
      let obj = JSON.parse(opt.data);
      let index = REMARK_ADDRESS.findIndex(e => e.name === obj.remark);
      this.data.remarkAddress.forEach(e => e.color = false);
      this.data.remarkAddress[index].color = true;
      this.setData({
        address: obj,
        remarkAddress: this.data.remarkAddress,
        key: 1
      });
    }
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
    address.isdefault = !address.isdefault;
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
  chooseItem(e) {
    const _this = this;
    _this.data.remarkAddress.forEach(e => e.color = false);
    _this.data.remarkAddress[e.currentTarget.dataset.index].color = true;
    let address = this.data.address;
    address.remark = _this.data.remarkAddress[e.currentTarget.dataset.index].name;
    _this.setData({
      remarkAddress: _this.data.remarkAddress,
      address: address

    })
  },
  cancelAddress() {
    wx.navigateTo({
      url: '/module-user/address/address',
    })
  },
  async saveAddress() {
    let just = this.justAddressInfo();
    if (just) {
      this.data.address.userId = '123';
      console.log(this.data.address)
      let data = await storeService.saveUserAddressInfo(this.data.address);
      if (data) {
        wx.showToast({ title: '添加成功' })
        wx.navigateTo({ url: '/module-user/address/address' })
      }
    }
  },
  // 更新用户信息
  async updateAddress() {
    let just = this.justAddressInfo();
    if (just) {
      let data = await storeService.updateUserAddress(this.data.address.id, this.data.address);
      if (data) {
        wx.showToast({ title: '更新成功' })
        wx.navigateTo({ url: '/module-user/address/address' })
      }
    }
  },
  // 判断用户信息的完整性
  justAddressInfo() {
    let address = this.data.address;
    if (address.username == '') {
      showErrorToast('请输入姓名');
      return false;
    }
    if (address.phone == '') {
      showErrorToast('请输入手机号码');
      return false;
    }
    if (address.phone.length !== 11) {
      showErrorToast('手机号格式错误');
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
    return true;
  }
});