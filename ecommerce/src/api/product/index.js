import {
    baseUrl
} from "../base";

const base = {
    getTypeList: '/types/getList',
    getProductHotWords: '/search/hotWords'
}
const api = {
    getList:  pid =>  global.axios.get(baseUrl + base.getTypeList, {params: {pid}}), //根据商品pid获取数据
    getProductHotWords:() => global.axios.get(baseUrl + base.getProductHotWords), //热词搜索
}

export default api;