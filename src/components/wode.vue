<template>
  <div class="form-fu">
    <h2>我是我的</h2>
    <!-- <div class="form-class"> -->
        <!-- <form @submit.prevent="submit">  
                <label for="">账号</label><input class="login" type="text" name="name" v-model="inputtext.name">  
                <label for="">密码</label><input class="login" type="password" name="password" v-model="inputtext.password">  
                <input type="submit" value="提交">  
        </form>  -->

        <!-- <label for=""> 填写token </label> <input class="login" type="text" placeholder="请输入token" v-model="tokenText"><button value="提交2"></button>  -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'wode',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputtext:{},
      tokenText:''
    }
  },
  mounted(){
      this.$http.post(this.$http.defaults.baseURL+'/accesstoken',{
        accesstoken:"8d99266f-6b12-47f2-aa83-d8507584973a"
      })
      .then((response) =>{
            console.log(response);
      })
      .catch(function (error) {
            console.log(error);

       });
  },
  methods:{
    submit(){
       this.$http.post('https://www.vue-js.com/signin',{
        name:this.inputtext.name,
        pass:this.inputtext.password
      })
      .then((response) =>{
            console.log(response);
      })
      .catch(function (error) {
            console.log(error);

       });
      console.log(this.inputtext);  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
/* .login{
  border:1px solid red;
}
.form-fu{
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
} */
</style>
