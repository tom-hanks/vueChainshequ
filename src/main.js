// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../static/js/http.js' // server

Vue.use(Vant);

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$Http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 请求拦截器
var myInterceptor=axios.interceptors.request.use(
    config => {
        var xtoken = localStorage.getItem('accesstoken');
        if(xtoken != null){
            config.headers['X-Token'] = xtoken
        }
        // console.log('看看')
        // console.log(config.data.accesstoken)
       
        if(config.method=='post'){
            if(xtoken == null){
                // console.log(config.url)
                // alert('前去登陆页登陆');
                // router.replace({
                //     path: '/wode',
                //     query: {redirect: router.currentRoute.fullPath}
                // })
                    // return false;

            }
            if(!xtoken){//此处判断是当POST的时候没有token就去输入框的token去验证
                if(config.data){
                    xtoken=config.data.accesstoken;
                }else{
                    alert('请先登陆');
                    return false;
                }
                
            }
            config.data = {
                ...config.data,
                accesstoken:xtoken,
            }
        }else if(config.method=='get'){
            // config.params = {
            //     accesstoken:xtoken,
            //     ...config.params
            // }
        }
        return config
    },function(error){
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(function (response) {
// token 已过期，重定向到登录页面
if (response.data.code == 4){
    localStorage.clear()
    router.replace({
                    path: '/fabu',
                    query: {redirect: router.currentRoute.fullPath}
                })
}
return response
}, function (error) {
// Do something with response error
return Promise.reject(error)
})


