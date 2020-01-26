import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor () {
    this.baseURL = baseURL
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      // 请求发出时的监听器
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      let { status, data } = res
      return { status, data }
    }, error => {
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    var potions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(potions)
  }
}
export default HttpRequest
