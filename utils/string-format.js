/*
 * @Author: shichaoxin
 * @Date: 2020-04-17 15:49:16
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-24 14:06:05
 */

/**
 * 转换url中的parmas参数以及query参数
 * @param {string} str
 * @param {object} data
 * @return url;
 */
export const stringFormatArr = (str, data) => {
  if (!str || data == undefined) {
    return str;
  }

  if (typeof data === "object") {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        str = str.replace(new RegExp("\{" + key + "\}", "g"), data[key]);
      }
    }
  } else {
    let args = arguments,
      reg = new RegExp("\{([0-" + (args.length - 1) + "])\}", "g");
    return str.replace(reg, (match, index) => {
      return args[index - (-1)];
    });
  }
  return str;
}
