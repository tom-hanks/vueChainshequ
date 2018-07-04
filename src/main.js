// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://www.vue-js.com/api/v1'//以下 api 路径均以 https://vue-js.com/api/v1 为前缀
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (localStorage.getItem('accesstoken')) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }else {
//             next({
//                 path: '/wode',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
//   })


var myInterceptor=axios.interceptors.request.use(
    config => {
        var xtoken = localStorage.getItem('accesstoken');
        if(xtoken != null){
            config.headers['X-Token'] = xtoken
        }
        console.log('看看')
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
            config.params = {
                accesstoken:xtoken,
                ...config.params
            }
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




























// axios.interceptors.request.use(
//     config => {
//         console.log('sssss');
//         console.log(config.data.accesstoken)

//         if(config.data.accesstoken){
//             var xtoken=config.data.accesstoken;
//         }else{
//             var xtoken = localStorage.getItem('accesstoken')
//         }
//         if(xtoken != null){
//             config.headers['X-Token'] = xtoken
//         }
//         if(config.method=='post'){//post的时候执行的一些东西
//             if(!xtoken){//当执行post的时候，这里可以执行一些全局想放的判断
//                 alert('请先登陆');
//                 return false;
//             }
//             config.data = {
//                 ...config.data,
//                 accesstoken: xtoken,//注意：token的名字是 accesstoken 
//             }
//         }else if(config.method=='get'){//get的时候执行的一些东西
            
//             if(!xtoken){//当执行post的时候，这里可以执行一些全局想放的判断
//                 console.log('请先登陆');
//                 xtoken=false;
//                 // return false;
//             }
//             config.params = {
//                 accesstoken: xtoken,
//                 ...config.params
//             }
//         }
//         return config
//     },function(error){
//         return Promise.reject(error)
//     }
// )
// // 添加请求拦截器
// axios.interceptors.response.use(function (response) {
//     console.log(response)
// // token 已过期，重定向到登录页面
// if (response.data.code == 4){
//     localStorage.clear()
//     router.replace({
//                     path: '/wode',
//                     query: {redirect: router.currentRoute.fullPath}
//                 })
// }
// return response
// }, function (error) {
// // Do something with response error
// return Promise.reject(error)
// })
