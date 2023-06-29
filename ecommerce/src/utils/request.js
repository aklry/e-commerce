import axios from 'axios'
import qs from 'querystring'

const options = {
    //超时
    timeout: 5000
}
/**
 * 
 * @param {Number} status 状态码
 * @param {String} info 错误信息
 */
function errorHandler(status, info) {
    switch (status) {
        case 400:
            return '客户端请求的语法错误，服务器无法理解'
        case 401:
            return '请求要求用户的身份认证'
        case 403:
            return '服务器理解请求客户端的请求，但是拒绝执行此请求'
        case 404:
            return '服务器无法根据客户端的请求找到资源（网页）'
        case 500:
            return '服务器内部错误，无法完成请求'
        case 501:
            return '服务器不支持请求的功能，无法完成请求'
        case 502:
            return '作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应'
        default:
            return info
    }
}
//创建axios实例
const instance = axios.create(options)
//请求拦截
instance.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => Promise.reject(error)
)
//响应拦截
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error
        if (response) {
            //服务器返回了数据，但是数据是错误的
            const result = errorHandler(response.status, response.info)
            throw new Error(result)
        } else {
            console.log('请求地址错误')
        }
    }
)
export default instance