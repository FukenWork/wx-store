/**
 * 统一提示
 * @param {string} msg 
 */
export const showErrorToast = (msg) => {
  wx.showToast({
    title: msg,
    // image: '/static/images/icon_error.png'
    icon: 'none'
  })
}
/**
 * 按照数组中的属性进行排序
 */
export const compare = (property) => {
  return function (a, b) {
    let value1 = a[property];
    let value2 = b[property];
    return value1 - value2;
  }
}