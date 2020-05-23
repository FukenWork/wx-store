export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
export const HEADER = {
  'Content-Type': 'application/json; charset=utf-8',
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
  path: '/module-category/shop-car/shop-car'
},
{
  navName: '分类',
  icon: '/images/home/category.png',
  path: '/module-category/category/category'
},
{
  navName: '我的',
  icon: '/images/home/person.png',
  path: '/module-user/own/own'
}
]
export const REMARK_ADDRESS = [
  { name: '家庭', color: true },
  { name: '公司', color: false },
  { name: '公寓', color: false },
  { name: '学校', color: false },
  { name: '医院', color: false },
  { name: '政府', color: false }
]
export const GOODS_LIST = [
  {name: '综合', id: 1},
  {name: '最新', id: 2},
  {name: '价格', id: 3},
  {name: '销量', id: 4}
]
export const ORDER_LIST = [
  {name: '全部', id: 1},
  {name: '待支付', id: 2},
  {name: '已支付', id: 3},
  {name: '待评价', id: 4},
  {name: '已评价', id: 5}
]