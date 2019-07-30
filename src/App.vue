<template>
  <div id="app">
        <router-view></router-view>
    <ul class="ul_base" v-if="$route.name !== 'details'">
      <router-link active-class="nav_color" to="/home" tag="li"><s class="iconfont icon-shouye"></s>首页</router-link>
      <router-link active-class="nav_color" to="/fabu" tag="li"><s class="iconfont icon-caidan1"></s>发布</router-link>
      <router-link active-class="nav_color" to="/xiaoxi" tag="li"><s class="iconfont icon-huifu"></s>消息</router-link>
      <router-link active-class="nav_color" to="/wode" tag="li"><s class="iconfont icon-wode"></s>我的</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  watch:{
    $route(to,from){
      // console.log('路由-app----',to,from);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.ul_base{
  width: 100%;
  background: #fff;
  position:fixed;
  bottom: 0;
  z-index: 3;
}
.ul_base>li.nav_color{
  color:#009688;
  /* background:burlywood; */
}
.ul_base>li{
  width: 25%;
  height:3rem;
  line-height: 3rem;
  text-align: center;
  float: left;
  cursor: pointer;
}
</style>
