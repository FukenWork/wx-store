import { storeService } from '../../services/services';
import { showErrorToast } from '../../utils/util'
Page({
  data: {
    addressList: [],
    item:{},
    token: ''
  },
  onShow(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressList();
  },
  async getAddressList() {
    const data = await storeService.getUserAddresssList('123', this.data.token);
    this.setData({addressList:data})
  },
  upDateAddress(e) {
    wx.navigateTo({
      url: `/module-user/address/address-add/address-add?data=${JSON.stringify(e.currentTarget.dataset.item)}&key=1`
    })
  },
  addressAddOrUpdate(e) {
    wx.navigateTo({
      url: `/module-user/address/address-add/address-add?data=0`
    })
  },
 async deleteAddress(event) {
    this.setData({showModal: true, item:event});
  },
  onCancel() {
    this.setData({showModal: false})
  },
  async onConfirm() {
    let data = await storeService.delteAddress([this.data.item.currentTarget.dataset.addressId]);
    if(data) {
      await this.getAddressList();
      showErrorToast('删除成功');
      this.setData({showModal: false})
    }
  }
})