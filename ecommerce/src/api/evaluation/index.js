import {
    baseUrl
} from "../base";

const base = {
    getEvaluation: '/evaluation/getEvaluation'
}

const api = {
    getEvaluation: productId => global.axios.get(baseUrl + base.getEvaluation, { params: { productId }}), //获取相关商品的评价
}

export default api