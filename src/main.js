// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1/'//以下 api 路径均以 https://vue-js.com/api/v1 为前缀
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
