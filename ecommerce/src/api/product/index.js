import {
    baseUrl
} from "../base";

const base = {
    getTypeList: '/types/getList',
    getProductHotWords: '/search/hotWords',
    getProductTypeId: '/types/getTypeId',
    getBrandByTypeId: '/product/getBrand',
    getProduct: '/product/getProduct',
    getDetails: '/product/getDetails',
    starProduct: '/product/star',
    cancelStarProduct: '/product/cancelStar',
    getListStared: '/product/listStared'
}
const api = {
    getList:  pid =>  global.axios.get(baseUrl + base.getTypeList, {params: {pid}}), //根据商品pid获取数据
    getProductHotWords: () => global.axios.get(baseUrl + base.getProductHotWords), //热词搜索
    getProductTypeId: name => global.axios.get(baseUrl + base.getProductTypeId, { params: { name } }),//根据商品搜索的关键词获取商品类型的id
    getBrandByTypeId: id => global.axios.get(baseUrl + base.getBrandByTypeId, { params: { productType: id } }), //根据商品类型id获取品牌数据
    getProduct: params => global.axios.get(baseUrl + base.getProduct, { params: params }),// 获取商品列表
    getDetails: id => global.axios.get(baseUrl + base.getDetails, { params: { id } }), //获取商品详情
    starProduct: productId => global.axios.post(baseUrl + base.starProduct, { productId }), //收藏商品
    cancelStarProduct: productId => global.axios.post(baseUrl + base.cancelStarProduct, { productId }), //取消收藏商品
    getListStared: () => global.axios.get(baseUrl + base.getListStared)
}
export default api;