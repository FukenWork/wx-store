import { storeService } from '../../services/services';
import TimeFormat from '../../utils/time-format.js';

const page = {

  async onLoad() {
    let data = await storeService.collectList('123');
    if(data.length !== 0) {
      data.forEach(e => e.cTime = TimeFormat.getTime(e.cTime));
    }
    this.setData({
      list: data
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/module-category/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  }
}
export default Page(page)