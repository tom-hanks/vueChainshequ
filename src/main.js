// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1'//以下 api 路径均以 https://vue-js.com/api/v1 为前缀
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    var accesstoken =localStorage.getItem('accesstoken')
      if (accesstoken) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
          config.headers.Authorization = accesstoken;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 403:
                  // 这里写清除token的代码
                  router.replace({
                      path: './fabu',
                      query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                  })
          }
      }
      return Promise.reject(error.response.data) 
  });