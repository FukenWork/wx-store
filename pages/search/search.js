import EventKeys from '../../common/event-keys.js';
const page = {
  data: {
    searchWord: ''
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
    let that = this;
    let discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('e.detail.value', discountName);
    // 保存搜索历史
    wx.setStorageSync(EventKeys.SEARCH_HISTORY_LIST, discountName);
    
  },
  // 点击按钮进行搜索
  searchButton() {
    if(this.data.searchWord) {
      wx.setStorageSync(EventKeys.SEARCH_HISTORY_LIST, this.data.searchWord);
    }
  },
  // 清空缓存数据
  cleanStorage() {
    wx.removeStorageSync(EventKeys.SEARCH_HISTORY_LIST);
  }
}
export default Page(page);