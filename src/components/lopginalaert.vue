<template>
  <div v-show="loginPan" class="login_tan">
        <p class="login_tan_k">提示：</p>
        <p class="login_tan_tip">请先登录，登录后即可点赞。</p>
        <router-link class="login_tan_button" tag="button" to="/wode">去登陆</router-link>
        <button class="login_tan_button" @click="loginhide()">取消</button>
  </div>

</template>
<script>

export default {
  name: 'login_tan',
  props : ['loginTanFlag'],//父组件传值控制显示隐藏
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginPan:false
    }
  },
  created(){
  
  },
  filters:{

  },
  mounted(){
    
},
 watch:{
     loginTanFlag(ewValue,oldValue){
       this.loginPan=ewValue;
        console.log(ewValue)
     }
  },
  methods:{
    loginhide(){
      this.$emit('changesbox',false);//告诉父组件该隐藏了
      // console.log(this.loginTanFlag)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_tan{
    width:22.5rem;
    height: 12.5rem;
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
    margin-top: 1.25rem;
    margin-left: 1.625rem;
}
</style>
