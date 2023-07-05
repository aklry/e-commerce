import { baseUrl } from "../base"

const base = {
    getAddressList: '/address/list',
    addAddress: '/address/add',
    updateAddress: '/address/update',
    deleteAddress: '/address/delete'
}

const api = {
    getAddressList: () => global.axios.get(baseUrl + base.getAddressList), //获取收货地址列表
    addAddress: params => global.axios.post(baseUrl + base.addAddress, params), //添加地址信息
    updateAddress: params => global.axios.post(baseUrl + base.updateAddress, params), //修改地址信息
    deleteAddress: params => global.axios.post(baseUrl + base.deleteAddress, params), //删除地址信息
}

export default api