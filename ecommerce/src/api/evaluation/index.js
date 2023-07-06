import {
    baseUrl
} from "../base";

const base = {
    getEvaluation: '/evaluation/getEvaluation',
    addEvaluation: '/evaluation/add',
    getByOrderId: '/evaluation/getByOrderId'
}

const api = {
    getEvaluation: productId => global.axios.get(baseUrl + base.getEvaluation, { params: { productId } }), //获取相关商品的评价
    addEvaluation: params => global.axios.post(baseUrl + base.addEvaluation, params), //添加商品评价
    getByOrderId: orderId => global.axios.get(baseUrl + base.getByOrderId, { params: { orderId }}), //根据订单id获取相对应的评价
}

export default api