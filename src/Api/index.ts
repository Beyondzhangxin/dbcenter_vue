import Env from './env';
import axios from 'axios';
import store from '@/store'
import {AxiosRequestConfig } from 'axios';
// import Vue from 'vue'


// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });


axios.defaults.withCredentials=true;
// // http response 拦截器
// // 添加一个响应拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 401 清除token信息并跳转到登录页面
//                   store.commit(types.LOGOUT);
//                   router.replace({
//                       path: 'login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//                   break;
//               case 403:
//                   // 401 清除token信息并跳转到登录页面
//                   store.commit(types.LOGOUT);
//                   router.replace({
//                       path: 'login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//                   break;
//           }
//       }
//       // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//       return Promise.reject(error.response.data)
//   });
//Vue.prototype.$axios = axios;
//基地址
let base = Env.baseURL;
let db_base=Env.db_baseURL;



function setConfig(config:any){
  if(store.getters.getUserInfo){
    if(!config.headers) {
      config.headers={}
    }
    // console.log(store.getters.getUserInfo.token);
    config.headers['Authorization'] = store.getters.getUserInfo.token;
    config.headers['Content-Type'] = 'application/json';

  }
}
//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url:string, params:object, config:any):any => {
  setConfig(config)
  return axios.post(`${base}${url}`, params ,config).then(res => res.data)
}
export const db_POST = (url:string, params:object, config:any):any => {
  setConfig(config)
  return axios.post(`${db_base}${url}`, params ,config).then(res => res.data)
}

export const GET = (url:string, params:object):any => {
  let config = {}
  setConfig(config)
  return axios.get(`${base}${url}`, {params: params,...config}  ).then(res => res.data)
}
export const db_GET = (url:string, params:object):any => {
  let config = {}
  setConfig(config)
  return axios.get(`${db_base}${url}`, {params: params,...config}  ).then(res => res.data)
}


// export const GET = (url, params ,config) => {
//     return axios.get(`${base}${url}`, params,config).then(res => res.data)
//   }
export const PUT = (url:string, params:object, config:object):any => {
  setConfig(config)
  return axios.put(`${base}${url}`, params, config).then(res => res.data)
}

// export const DELETE = (url, params) => {
//   return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
// }
export const DELETE = (url:string, config:object):any => {
    setConfig(config)
    return axios.delete(`${base}${url}`, config).then(res => res.data)
}

export const PATCH = (url:string, params:object):any => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
