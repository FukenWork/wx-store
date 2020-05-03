const RequestUrl = {
  // 获取用户地址
  getUserAddresssByUserId: '/api/v1/userAddress/{userId}?userId={userId}',
  // 保存用户地址
  saveAddress: '/api/v1/saveAddress',
  // 根据id删除用户地址
  deleteUserAddressById: '/api/v1/deteleByIds',
  // 更新用户信息地址：
  updateUserAddress: '/api/v1/updateaddress/{id}',
  // 保存种类信息
  saveCategory: '/api/v1/saveCategory',
  // 获取全部种类信息
  getCategory: '/api/v1/getCategory',
  // 获取全部商品信息
  goodsList: '/api/v1/getGoods?page={page}&size={size}',
  // 保存商品信息
  saveGoodsInfo: '/api/v1/saveGoods',
  // 根据商品的id查询商品的信息
  findGoodsInfoById: '/api/v1/findGoodsById/{id}/{userId}',
  // 根据商品的名称模糊查询
  findByGoodsNameSearch: '/api/v1/findGoodsById?name={name}',
  // 收藏商品
  collect: '/api/v1/saveCollect',
  // 取消收藏
  cancel: '/api/v1/cancel?id={id}',
  // 根据用户的id获取用户的收藏信息
  collectByUserId: '/api/v1/getCollectList/{userId}'
}
export default RequestUrl;