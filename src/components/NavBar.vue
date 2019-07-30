<template>
  <div class="nav-bar">
    <div class="btn-back" @click="back">
      <img class="arrow-back" src="../assets/logo.png">
    </div>
    <div class="title" v-if="title">
      {{title}}
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      title: {
        type: String
      },
      backTo: {
        type: String,
        default: '/'
      }
    },
    methods: {
      back () {
        this.$router.push(this.backTo)
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import './NavBar.scss';
</style>