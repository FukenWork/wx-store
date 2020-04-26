/*
 * @Author: shichaoxin
 * @Date: 2020-04-24 14:12:56
 * @Last Modified by:   shichaoxin
 * @Last Modified time: 2020-04-24 14:12:56
 */

/**
 * 时间单数补0
 * @param {*} value
 */
function addZero(value) {
  return value < 10 ? `0${value}` : value
}
const timeFormat = {
  getTime(value) {
    const time = new Date(value);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const mintues = time.getMinutes();
    const seconds = time.getSeconds();
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(mintues)}:${addZero(seconds)}`;
  }
}

export default timeFormat;