<template>
  <div class="container">

    <!--对于scroller默认高度总是占满父容器，虽然可以使用属性设置高度-->
    <!--但在用一个div包住4会更简单点-->
    <div style="height: 600px">

      <!--scroller组件定位方式用relative 否则会溢出父容器-->
      <scroller
        class="scroller"
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller">
        <div v-for="(item, index) in items" @click="onItemClick(index, item)"
             class="row">
          {{ item }}
        </div>
      </scroller>
    </div>

    <div style="height: 200px;width: 100%;background: gray"></div>
  </div>

</template>

<script>
  export default {

    data() {
      return {
        items: []
      }
    },
    mounted() {
      for (let i = 1; i <= 20; i++) {
        this.items.push(i)
      }
    },
    methods: {
      refresh(done) {
        this.items = [1, 2, 3, 4, 5, 6].map(() => parseInt(Math.random() * 10))
        done()
      },
      infinite(done) {
        this.items = this.items.concat([12, 3, 4, 42,])
        done()
      },
      onItemClick(index, item) {
        console.log(index)
      }
    }
  }
</script>


<style scoped>
  .container {
    height: 100vh;
    overflow-y: scroll;
  }

  .row {
    height: 100px;
    width: 100px;
    background: deepskyblue;
    margin: 10px;
  }

  .scroller {
    position: relative;
  }
</style>