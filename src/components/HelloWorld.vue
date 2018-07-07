<template>
  <div class="HelloWorld">
    <input type="text" placeholder="请输入内容" v-model="inpuTxt">
    <p>{{inpuTxt}}</p>
    <router-link to="./xiaoxi">走着</router-link>
    <button @click="setAuthor()">我是按钮</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      inpuTxt: ''
    }
  },
  methods:{
    setAuthor: function () {
　　　this.$store.commit ('newAuthor',this.inpuTxt)
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
</style>
