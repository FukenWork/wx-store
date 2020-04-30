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