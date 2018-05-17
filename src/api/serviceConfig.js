import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

// axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.baseURL = 'http://localhost:4000/' // 本地
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'https://thor.vechaindev.com/'
// Vue.prototype.baseURL = 'https://thor.vechaindev.com/'
axios.defaults.baseURL = 'http://192.168.43.142:8020/'
Vue.prototype.baseURL = 'http://192.168.43.142:8020/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // _.toast("错误的传参", 'fail');
  Message.error('参数错误')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // debugger
    let result = res.data
    if (result && res.data.code === 1) {
      return Promise.resolve(res.data)
    }
  },
  error => {
    // debugger
    const response = error.response
    if (response && Object.prototype.toString.call(response.data) === '[object Object]') {
      Message.error(error.response.data.message)
    } else {
      Message.error(`${error.message}`)
    }
    return Promise.reject(error)
  }
)

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  // 登录
  login(params) {
    return axios.post('api/v1/account/signin', params)
  },
  // 登出
  logout() {
    return axios.post('api/v1/account/signout')
  },
  // 重置
  reset(params) {
    return axios.post(`api/v1/thor/${params.operid}/reset`, params.signin)
  },
  // 获取上一笔交易信息
  getLatestTransaction() {
    return axios.get('api/v1/thor/history/latest')
    // return axios.get('http://localhost:4000/static/latest.json')
  },
  // 获取当前交易信息
  getNowTransaction(params) {
    return axios.get(`api/v1/thor/${params.operid}`)
    // return axios.get('/static/now.json')
  },
  // 获取交易列表
  getTransactionList(params) {
    // console.log(params)
    return axios.get(`api/v1/thor/history?page=${params.page}&pagesize=${params.pagesize}`)
  },
  // 获取区块高度相关信息
  getBlockHeightInfo(params) {
    // console.log(params)
    return axios.get('/static/info.json')
  },
  // 生成文件返回id
  exportFile(params) {
    // console.log(params)
    return axios.post('api/v1/thor/export', params)
    // return axios.get('/static/export.json')
  },
  // 校验已上传的文件
  verify(params) {
    // console.log(params)
    // debugger
    return axios.get(`api/v1/thor/send/${params.operid}`)
    // return axios.get('/static/export.json')
  }
}
