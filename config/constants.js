export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
export const HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'callid': new Date().getTime(),
  'cv': '3.4.7',
  'lang': 'zh_CN',
  'timezone': 'Asia/Shanghai',
  'appplatform': 'ios_phone',
  'country': 'CN',
}
export const HEADER_NAV_LIST = [{
  navName: '购物车',
  icon: '/images/home/shop-car.png',
  path: '../shop-car/shop-car'
},
{
  navName: '分类',
  icon: '/images/home/category.png',
  path: '../category/category'
},
{
  navName: '我的',
  icon: '/images/home/person.png',
  path: '../own/own'
}
]