import {
    baseUrl
} from "../base";

const base = {
    getList: '/types/getList'
}

const api = {
    getList(pid) {
        return global.axios.get(baseUrl + base.getList, {params: {pid}})
    }
}

export default api;