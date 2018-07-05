<template>
  <div class="home">
    <div class="header clearfix"
  :class="header_bg">
          <span class="logo"></span>Vue.js 中文社区
          <span id="caidan" class="caidan iconfont icon-caidan" v-on:click="bgcolor"></span>
            <transition name="slide-fade">
                <ul v-if='colorNume' class="nav_Cai">
                  <li v-for="(items,index) in home_bg" :key="items.content" :cuncaidan="cun_caidan" v-on:click="style_bg(index)" v-bind:class="{heightliang:index===cun_caidan}">{{items.content}}</li>
                </ul>
            </transition>
          
    </div>
        <Navtab v-bind:message="header_bg"></Navtab>
  </div>
</template>

<script>
// 导入组件
import Navtab from '../components/nav_tab/nav_tab'

export default {
  name: 'home',
  components: {
    Navtab
  },
  data () {
    return {
      colorNume:false,
      activeColor:'red',
      home_bg:[
        {content:'LIGHT'},
        {content:'CARBON'},
        {content:'TEAL'}
      ],
      header_bg:'header_style2',
      cun_caidan:2
    }
  },
  created() {//页面加载完成前开始执行
  console.log('死犟')
        let body = document.querySelector('body')
        body.addEventListener('click',(e)=>{
            if(e.target.id!='caidan')  {
              this.colorNume = false;
            }
        },false)
    },
    mounted(){//window.onload 页面加载完成后开始执行

    },
  methods: {
    bgcolor() {
      this.colorNume=!this.colorNume;
    },
    style_bg(e){
      this.cun_caidan=e;
      this.header_bg='header_style'+e;
      // console.log('header_style'+e)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  height:4.2rem ;
  line-height: 4.2rem;
  background: #009688;
  position: fixed;
  top: 0;
  z-index: 3;
  border-top:1px solid #fff;
}
.header_style0{
  background: #7e57c2;
  color:#fff;
}
.header_style1{
    background-color: #474a4f;
    color: #ffffff;
}
.header_style2{
  background-color: #009688;
  color: #ffffff;
}
ul.nav_Cai{
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 0;
  right: 15px;
    -moz-box-shadow: 0 9px 30px -6px rgba(0,0,0,.2),0 18px 20px -10px rgba(0,0,0,.04),0 18px 20px -10px rgba(0,0,0,.04),0 10px 20px -10px rgba(0,0,0,.04);
    box-shadow: 0 9px 30px -6px rgba(0,0,0,.2), 0 18px 20px -10px rgba(0,0,0,.04), 0 18px 20px -10px rgba(0,0,0,.04), 0 10px 20px -10px rgba(0,0,0,.04);
}
ul.nav_Cai>li{
  display: block;
  height: 2.4rem;
  line-height: 2.4rem;
  color:#333333;
}
span.logo{
  float: left;
  width: 10%;
  height: 2.5rem;
  position: absolute;
  top: .7rem;
  left:  .76rem;
  background:url(../assets/logo.png)no-repeat center;
  background-size:100% 100%; 
}
span.caidan{
  font-size: 28px;
  float: right;
  color:#fff;
  position:absolute;
  right: 28px;
}
ul.nav_Cai>li.heightliang{
  color:red;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
