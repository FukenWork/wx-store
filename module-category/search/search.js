/*
 * @Author: shichaoxin
 * @Date: 2020-04-26 17:41:35
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-05-03 18:16:44
 */
import { storeService } from '../../services/services';
import EventKeys from '../../common/event-keys.js';
const page = {
  data: {
    searchWord: '',
    show: true,
  },
  onLoad() {
    // 获取缓存中的存放的搜索历史
    this.setData({ historyList: wx.getStorageSync(EventKeys.SEARCH_HISTORY_LIST) })
  },
  cancelword() {

  },
  inputWord(e) {
    this.setData({ searchWord: e.detail.value })
  },
  cleanlWord() {
    this.setData({ searchWord: '' })
  },
  // 手机上的软键盘
  bindconfirm(e) {
    let discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    // 保存搜索历史
    this.saveSearchHistoryList(discountName);
    this.setData({ show: false });
  },
  // 点击按钮进行搜索
  searchButton() {
    if (this.data.searchWord) {
      this.saveSearchHistoryList(this.data.searchWord);
      this.searchInit(this.data.searchWord);
    }
  },
  // 清空缓存数据
  cleanStorage() {
    wx.removeStorageSync(EventKeys.SEARCH_HISTORY_LIST);
    this.setData({ historyList: [] })
  },
  // 保存搜索的历史
  saveSearchHistoryList(data) {
    let list = wx.getStorageSync(EventKeys.SEARCH_HISTORY_LIST) || [];
    list.push(data);
    wx.setStorageSync(EventKeys.SEARCH_HISTORY_LIST, [...new Set(list)].reverse());
  },
 async searchItem(e) {
   this.searchInit(e.currentTarget.dataset.name);
  },
  async searchInit(name) {
    let list = await storeService.searchGoodsNameByKeyWord(name);
    console.log(list);
    this.setData({list: list, show: false});
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/module-category/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  }
}
export default Page(page);