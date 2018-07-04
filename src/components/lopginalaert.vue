<template>
  <div v-if="loginPan.type" class="login_tan">
        <p class="login_tan_k">提示：</p>
        <p class="login_tan_tip">{{loginPan.tip}}</p>
        <router-link 
        class="login_tan_button login_tan_left" 
        v-if="loginPan.num==1 || loginPan.num==0?false:true" 
        @click.native="loginhide()" 
        tag="button" 
        to="/wode">登陆</router-link>
        <button 
        class="login_tan_button login_tan_right" 
        v-if="loginPan.num==0?false:true" 
        v-bind:class="loginPan.num ==1?login_tan_yi:''"
        @click="loginhide()">取消</button>
  </div>

</template>
<script>

export default {
  name: 'login_tan',
  props : ['loginTanFlag'],//父组件传值控制显示隐藏
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginPan:{
        type:false,
        tip:"父组件传值控制显示隐藏",
        num:2//按钮个数
      },
      login_tan_yi:'login_tan_yi'
    }
  },
  created(){
    
  },
  filters:{

  },
  mounted(){
    // console.log(this.loginTanFlag)
},
 watch:{
     loginTanFlag:{
       handler: function (val, oldVal) { 
         this.loginPan.type=val.typePan //父组件里 对象要有 typePan和tip两个属性
         this.loginPan.tip=val.tip
         this.loginPan.num=val.num
        },
      deep: true
     }
  },
  methods:{
    loginhide(){
      this.$emit('changesbox',false);//告诉父组件该隐藏了
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_tan{
    width:22.5rem;
    height: 12.5rem;
    border-radius: 1rem;
    background: #fff;
    position: fixed;
    top:50%;
    left: 50%;
    margin-left: -11.25rem;
    margin-top: -6.25rem;
    box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
}
.login_tan_k{
    padding: 1.5rem 1.5rem 1.25rem;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
}
.login_tan_tip{
    font-size: 18px;
}
.login_tan_button{
    padding:3px 10px;
    margin-top: 1.6rem;
    border-radius: .2875rem;
}
.login_tan_left{
  margin-right: 1.25rem;
}
.login_tan_right{
  margin-left: 1.25rem;
}
.login_tan_yi{
  margin-left: 0;
}
</style>
