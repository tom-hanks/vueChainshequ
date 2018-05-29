
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import fabu from '@/components/fabu'
import xiaoxi from '@/components/xiaoxi'
import wode from '@/components/wode'
import nav_tab from '@/components/nav_tab/nav_tab'
import VueScroller from 'vue-scroller'

Vue.use(Router)
Vue.use(VueScroller)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'home',
      component: home
    },
    {
      path: '/fabu',
      name: 'fabu',
      component: fabu
    },
    {
      path: '/xiaoxi',
      name: 'xiaoxi',
      component: xiaoxi
    },
    {
      path: '/wode',
      name: 'wode',
      component: wode
    }
  ],
  mode: 'history'
})
