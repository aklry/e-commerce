import { baseUrl } from "../base"

const base = {
    getList: '/orders/list',
    addOrder: '/orders/add',
    deleteOrder: '/orders/delete',
}

const api = {
    getOrderList: () => global.axios.get(baseUrl + base.getList),
    addOrder: params => global.axios.post(baseUrl + base.addOrder, params),
    deleteOrder: params => global.axios.post(baseUrl + base.deleteOrder, params)
}

export default api