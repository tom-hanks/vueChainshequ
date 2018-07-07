import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import fabu from '@/components/fabu'
import xiaoxi from '@/components/xiaoxi'
import wode from '@/components/wode'
import details from '@/components/detailsListHome'
import nav_tab from '@/components/nav_tab/nav_tab'
import VueScroller from 'vue-scroller'
Vue.use(Router)
Vue.use(VueScroller)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'home',
      component: home,
      meta:{
        keep:true
      }
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
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/wode',
      name: 'wode',
      component: wode
    },
    {
      path:'/details/:id',
      name:'details',
       meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      component:details
    }
  ],
  mode: 'history'
})

