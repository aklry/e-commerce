import { baseUrl } from "../base"

const base = {
    getList: '/orders/list',
    addOrder: '/orders/add'
}

const api = {
    getOrderList: () => global.axios.get(baseUrl + base.getList),
    addOrder: params => global.axios.post(baseUrl + base.addOrder, params)
}

export default api