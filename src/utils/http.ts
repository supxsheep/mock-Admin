import axios from "axios";
import {toRefs} from 'vue'

import {
  useUserStore
} from '@/store/user'
const useUser = useUserStore()
const {
  token
} = toRefs(useUser)

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 15000,
})

//请求拦截器：在请求之前的数据处理，比如在请求头添加token,所有的请求都会经过请求拦截器
instance.interceptors.request.use(config => {
  //再请求头同意添加token
  // console.log('config: ', config);
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

//响应拦截器：在请求响应之后对数据处理，比如：登录失败、请求数据失败的处理
instance.interceptors.response.use(response => {
  return response.data
}, err => {
  return Promise.reject(err)
})


//封装请求函数
const callApi = (method:string = 'GET', url:string, data:object = {}) => {
  return instance({
    method,
    url,
    params: method === 'GET' ? data : {},
    data: method === 'POST' ? data : {}
  })
}
//GET请求函数
export const getApi = (url:string, data:object) => callApi('GET', url, data)
//POST请求函数
export const postApi = (url:string, data:object) => callApi('POST', url, data)