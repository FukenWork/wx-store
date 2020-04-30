/*
 * @Author: shichaoxin
 * @Date: 2020-04-30 15:12:00
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-30 17:53:40
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
}

export const storeService = new StoreService();