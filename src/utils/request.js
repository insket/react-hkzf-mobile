import axios from 'axios'

const request  = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  alert('网络超时')
  return Promise.reject(error);
});

export default request

