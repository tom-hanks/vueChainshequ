<template>
  <div id="app">
    <router-view></router-view>
    <ul class="ul_base">
      <router-link active-class="nav_color" to="/home" tag="li"><s class="iconfont icon-shouye"></s>首页</router-link>
      <router-link active-class="nav_color" to="/fabu" tag="li"><s class="iconfont icon-daohangfenlei1"></s>发布</router-link>
      <router-link active-class="nav_color" to="/xiaoxi" tag="li"><s class="iconfont icon-22"></s>消息</router-link>
      <router-link active-class="nav_color" to="/wode" tag="li"><s class="iconfont icon-yonghu"></s>我的</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

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
}
.ul_base>li.nav_color{
  color:red;
  background:burlywood;
}
.ul_base>li{
  width: 25%;
  height:3rem;
  line-height: 3rem;
  text-align: center;
  float: left;
}
</style>
