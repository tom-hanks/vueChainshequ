<template>
  <div id="app">
    <div class="header">
      <h1 class="title">Refresh & Infinite</h1>
    </div>

    <scroller style="top: 44px"
      :on-refresh="refresh"
      :on-infinite="infinite">
      <div v-for="(item, index) in ajaxdata" class="row" :class="{'grey-bg': index % 2 == 0}">
        {{item.title}}
      </div>
    </scroller>
  </div>
</template>

<script>
  import VueScroller from 'vue-scroller'
   export default {
    data() {
      return {
        items: [],
        ajaxdata:[],
        down_data_num:1,
        jieshou:''
      }
    },
    
    mounted() {
    	// for (var i = 1; i <= 20; i++) {
      //   this.items.push(i + ' - keep walking, be 2 with you.')
      // }
      // console.log()
      //  this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page:1}})
      //           .then((response) =>{
      //             if(b==1){
      //                 this.ajaxdata=[];
      //                 this.ajaxdata=this.ajaxdata.concat(response.data.data);
      //                 console.log(this.ajaxdata);
      //             }else{
      //                 this.down_data_num+=1;
      //                 this.ajaxdata=this.ajaxdata.concat(response.data.data)
      //                 console.log(this.ajaxdata)
      //             }
                  
      //           })
      //         .catch(function (error) {
      //           console.log(error);
      //         });
      // this.top = 1
      // this.bottom = 20
    },
    methods: {
      refresh (done) {
        setTimeout(() => {
          // var start = this.top - 1
          // for (var i = start; i > start - 10; i--) {
          //   this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          // }
          // this.top = this.top - 10;
          let jieshou=done
          this. ajaxHomeList(this.down_data_num,1,jieshou)
          console.log('顶部')
        }, 1500)
      },
      infinite (done) {
        setTimeout(() => {
          // var start = this.bottom + 1
          // for (var i = start; i < start + 10; i++) {
          //   this.items.push(i + ' - keep walking, be 2 with you.')
          // }
          // this.bottom = this.bottom + 10;
          this.down_data_num+=1;
          let jieshou = done
          this. ajaxHomeList(this.down_data_num,2,jieshou)
          console.log('底部')
        }, 1500)
      },
      ajaxHomeList(a,b,c){
       this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page:a}})
                .then((response) =>{
                  if(b==1){
                      this.ajaxdata=[];
                      this.ajaxdata=this.ajaxdata.concat(response.data.data);
                      console.log(this.ajaxdata);
                  }else{
                      // this.down_data_num+=1;
                      this.ajaxdata=this.ajaxdata.concat(response.data.data)
                      console.log('走到加载这一步了')
                      console.log(this.ajaxdata)
                  }
                  console.log(c)
                    c();
                  
                })
              .catch(function (error) {
                console.log(error);
              });
     }
    }
  }
</script>
<style>
  html, body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  .row {
    width: 100%;
    height: 50px;
    padding: 10px 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #444;
    background-color: #fff;
  }
  .grey-bg {
    background-color: #eee;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    width: 100%;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    background-color: #fff;
    z-index: 1000;
    color: #666;
  }
  .header > .title {
    font-size: 16px;
    line-height: 44px;
    text-align: center;
    margin: 0 auto;
  }
</style>