import { HEADER, METHOD } from '../config/constants';
import { ENV } from '../config/env';
import { showErrorToast } from './util';
const interceptors = []

class HttpClient {
  request(option) {
    const { url, method, data, header } = option;
    let requestheader = { ...HEADER, ...header }
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      try {
        wx.getNetworkType({
          success: res => {
            if (res.networkType !== 'none') {
              wx.request({
                url: (`${ENV.BASE_URL}${url}`),
                method: method || METHOD.GET,
                data,
                header: requestheader,
                success: (res) => {
                  wx.hideLoading();
                  // 错误判断
                  if (res.statusCode !== 200 && res.statusCode !== 201) {
                    return showErrorToast(res.data.message)
                  }
                  resolve(res.data);
                },
                fail: (err) => {
                  err && err.errMsg && err.errMsg.indexOf('request:fail') !== -1 ? wx.showToast({
                    title: '网络连接不可用，请稍后重试',
                    icon: 'none',
                    duration: 1000
                  }) : wx.showToast({
                    title: JSON.stringify(err),
                    icon: 'none',
                    duration: 10000
                  });
                }
              })
            } else {
              wx.showToast({
                title: '网络连接不可用，请稍后重试',
                icon: 'none',
                duration: 1000
              })
            }

          }
        })

      } catch (err) {
        wx.showToast({ title: err.message, icon: 'none' })
      }
    });
  }

  get(url, data, header = {}) {
    return this.request({ url, method: METHOD.GET, data, header })
  }

  delete(url, data, header = {}) {
    return this.request({ url, method: METHOD.DELETE, data, header })
  }

  post(url, data, header = {}) {
    return this.request({ url, method: METHOD.POST, data, header })
  }

  put(url, data, header = {}) {
    return this.request({ url, method: METHOD.PUT, data, header })
  }

  all(tasks) {
    return Promise.all(tasks)
  }
}
export function addDefaultInterceptor() {
  interceptors.push((res, resolve, reject) => {
    const status = res.statusCode;
    if (status !== 200 && status !== 201) {
      return reject(new Error(`internet error: ${status}`))
    }
    const body = res.data;
    return resolve(body)
  })
}
export const httpClient = new HttpClient()