<template>
  <div class="xiaoxi">
     <div class="title_top">
        <h2 class="title_title">消息</h2>
    </div>
    <div class="lizi">
      <footer class="footer">
          <ul>
              <li v-for="lis in ul">{{lis.li}}</li>
          </ul>
          <p>
              Copyright&nbsp;&copy;&nbsp;{{author}} - 2016 All rights reserved
          </p>
              <router-link to="./HelloWorld">HelloWorld</router-link>
      </footer>
    </div>
       
  </div>
</template>
 
<script>
 
  export default {
    name:'xiaoxi',
    components: {
    },
    data() {
      return {
        message:'hello',
        ul: [
          { li: '琉璃之金' },
          { li: '朦胧之森' },
          { li: '缥缈之滔' },
          { li: '逍遥之火' },
          { li: '璀璨之沙' }
        ]
      }
    },
    created(){

    },
    computed:{
        author () {
          return this.$store.state.author
        }
    },
    mounted(){

    },
    methods:{
     
    }
  }
</script> 

<style scoped>
.form-button{
  display: block;
  width: 6rem;
  height: 2rem;
  border-radius: .4rem;
  background: #009688;
  margin: 0 auto;
  margin-top: 3rem;
  color:#fff;
}
.title_top {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  display: flex;
  background: #009688;
  color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.title_title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1.25rem;
  font-size: 1.125rem;
}
.lizi{
  margin-top: 5rem;
}
</style>
