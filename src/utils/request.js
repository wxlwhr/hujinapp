import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://172.16.7.75:8702/mock/5bf6109cae929b000d6000f9',
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = ' bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    const getTimestamp = new Date().valueOf()
    if (config.url.indexOf('?') > -1) {
      config.url = config.url + '&timestamp=' + getTimestamp
    } else {
      config.url = config.url + '?timestamp=' + getTimestamp
    }
    return config
  },
  error => {
    // Do something with request error
    Message.error({ message: '请求超时!' })
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response
    if (res) {
      switch (res.data.code) {
        // 成功
        case 200:
          return res.data.data
        case 599:
          return res.data
        // token失效状态
        case 10086:
          store.dispatch('ForcedLogOut', res.data.message)
          return
        // 自己处理错误信息
        case 10010:
          return res.data
        default:
          Message.error({
            message: res.data.message,
            showClose: true
          })
      }
      return Promise.reject('error')
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   // message: error.message,
    //   message: '您的网络状态不稳定，请稍后重试',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
