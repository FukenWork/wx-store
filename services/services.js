/*
 * @Author: shichaoxin
 * @Date: 2020-04-30 15:12:00
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-05-05 13:06:56
 */

import RequestUrl from '../config/url';
import { httpClient } from '../utils/http-client';
import { stringFormatArr } from '../utils/string-format';
class StoreService {
  // 获取用户地址信息
  getUserAddresssList(userId) {
    let url = stringFormatArr(RequestUrl.getUserAddresssByUserId, { userId });
    return httpClient.get(url);
  }
  // 保存用户填写的地址信息
  saveUserAddressInfo(addressInfo) {
    const url = RequestUrl.saveAddress;
    return httpClient.post(url, addressInfo);
  }
  delteAddress(ids) {
    let url = RequestUrl.deleteUserAddressById;
    return httpClient.delete(url, ids);
  }
  updateUserAddress(id, addressInfo) {
    const url = stringFormatArr(RequestUrl.updateUserAddress, { id });
    return httpClient.put(url, addressInfo);
  }
  saveCategory(categoryInfo) {
    const url = RequestUrl.saveCategory;
    return httpClient.post(url, categoryInfo);
  }
  getCategory() {
    const url = RequestUrl.getCategory;
    return httpClient.get(url);
  }
  getGoodslistByPageAble(page, size) {
    const url = stringFormatArr(RequestUrl.goodsList, { page, size });
    return httpClient.get(url);
  }
  saveGoodsInfo(goodsInfo) {
    const url = RequestUrl.saveGoodsInfo;
    return httpClient.post(url, goodsInfo);
  }
  findGoodsInfoById(id, userId) {
    const url = stringFormatArr(RequestUrl.findGoodsInfoById, { id, userId });
    return httpClient.get(url);
  }
  searchGoodsNameByKeyWord(name) {
    const url = stringFormatArr(RequestUrl.findByGoodsNameSearch, { name });
    return httpClient.get(url);
  }
  collectGoods(collectInfo) {
    const url = RequestUrl.collect;
    return httpClient.post(url, collectInfo);
  }
  cancelCollect(id) {
    const url = stringFormatArr(RequestUrl.cancel, { id });
    return httpClient.delete(url);
  }
  collectList(userId) {
    const url = stringFormatArr(RequestUrl.collectByUserId, { userId });
    return httpClient.get(url);
  }
  getGoodsListInHome(page, size) {
    const url = stringFormatArr(RequestUrl.getGoodsListInHome, { page, size });
    return httpClient.get(url);
  }
  wxlogin(code, username, userGender) {
    const url = stringFormatArr(RequestUrl.wxlogin, {code, username, userGender});
    return httpClient.get(url);
  }
}

export const storeService = new StoreService();