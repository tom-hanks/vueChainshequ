<template>
  <div>
    <!-- <nav-bar title="Custom Spinner"></nav-bar> -->

    <scroller style="top: 44px;"
      :on-refresh="refresh"
      :on-infinite="infinite"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949"
    >
      <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>

      <!-- <div v-for="(item, index) in tabs[selected].tabContent"
          class="row"
          :class="{'grey-bg': index % 2 == 0}">
        {{ item.title }}
      </div> -->
       <section  class="list" v-for="(item,idnex) in tabs[selected].tabContent">
                          <img  class="" v-bind:src="item.author.avatar_url"  alt="user">
                          <div  class="content">
                              <div  class="list_title">
                                  <span v-if='item.top' class='dingtop'>置顶</span> 
                                  <span v-else-if="item.top === false&&item.tab==='ask'" class="elsedingtop">问答</span>
                                  <span v-else-if="item.top === false&&item.tab==='share'" class="elsedingtop" >分享</span>
                                  <span v-else-if="item.top === false&&item.tab==='good'" class="elsedingtop" >精华</span>
                                  <span v-else-if="item.top === false&&item.tab==='weex'" class="elsedingtop" >weex</span>
                                  <span v-else-if="item.top === false&&item.tab==='job'" class="elsedingtop" >招聘</span>


                                   <h3 >{{item.title}}</h3>
                              </div>
                              <div  class="timer"><span >179 / 117440</span>  <span >2天前</span>
                              </div>
                          </div>
                      </section>
      <!-- custom infinite spinner -->
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
    </scroller>
  </div>
</template>

<script>
  // import NavBar from './NavBar.vue'

  export default {
    components: {
      // NavBar
    },

    data () {
      return {
      msg: "Welcome to Your Vue.js App",
      selected: 0,
      loading:'正在加载中',
        tabs:[{
              tab:'全部',
              tabName:'all',//请求要带的标识
              down_data_num:1,
              tabContent:[]//属于各自的数组，存各自的东西，为空的时候才触发请求
            },{
              tab:'精华',
              tabName:'good',
              down_data_num:1,
              tabContent:[]
            },{
              tab:'weex',
              tabName:'weex',
              down_data_num:1,
              tabContent:[]
            },{
              tab:'分享',
              tabName:'share',
              down_data_num:1,
              tabContent:[]
            },{
              tab:'问答',
              tabName:'ask',
              down_data_num:1,
              tabContent:[]
            },{
              tab:'招聘',
              tabName:'job',
              down_data_num:1,
              tabContent:[]
        }],
      ajaxdata: [],
      down_data_num: 1,
      items: [],
      tab_ajax: "all",
      ok_data: false,
      jiazai: true
      }
    },

    mounted() {
      for (let i = 1; i <= 20; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.ajaxHomeList(1,1,null,this.tabs[this.selected].tabName)
      this.top = 1
      this.bottom = 20
    },

    methods: {
       ajaxHomeList(a, b, d) {
      //a：是页码，从1开始；b：等于1的时候是下拉刷新，等于2就是上拉加载更多，c：传入的done 点激的时候没有；d：//请求要带的标识
      this.$http
        .get("https://www.vue-js.com/api/v1/topics", {
          params: { tab: d, page: a }
        })
        .then(response => {
          if(response.data.data.length<25){
            console.log('返回数据的长度---'+response.data.data.length)
            this.ok_data=true;
            this.loading='已加载全部'
            return false;
          }else{
            this.loading='正在加载中'
          }

          if (b == 1) {
            // 顶部
            this.tabs[this.selected].tabContent = [];
            this.tabs[this.selected].tabContent = this.tabs[
              this.selected
            ].tabContent.concat(response.data.data);
            console.log(this.tabs[this.selected].tabContent);
            console.log("顶部");
          } else {
            // console.log('到底部')
            this.tabs[this.selected].tabContent = this.tabs[
              this.selected
            ].tabContent.concat(response.data.data);
            console.log(this.tabs[this.selected].tabContent);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      refresh(done) {
        setTimeout(() => {
          let start = this.top - 1
          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }
          this.top = this.top - 10;
          done()
        }, 1500)
        console.log('顶部')
      },

      infinite(done) {
        if (this.bottom >= 30) {
          setTimeout(() => {
            done(true)
          }, 3500)
        console.log('已经加载全部')
          
          return;
        }

        setTimeout(() => {

          this.tabs[this.selected].down_data_num += 1;
          this.ajaxHomeList(this.tabs[this.selected].down_data_num, 2, this.tab_ajax);
              
          setTimeout(() => {
            done()
          })
        console.log('底部')
          
        }, 3500)
      }
    }
  }
</script>
<style>
 .nav-bar {
    width: 100%;
    height: 44px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    background-color: #fff;
    position: relative;
    z-index: 1000;
  }

  .btn-back {
    height: 100%;
    position: absolute;
    top: 0;
    left: 10px;
  }

  .arrow-back {
    width: 8px;
    height: 16px;
    float: left;
    margin-top: 14px;
    margin-right: 15px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 46px;
    color: #666;
  }
   .plugin-name {
    margin: 0;
    padding-top: 60px;
    text-align: center;
    color: #666;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .for-vue-js {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  .plugin-name, .for-vue-js {
    font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  }

  .row {
    display: block;
    width: 100%;
    height: 50px;
    padding: 10px 0 10px 15px;
    font-size: 16px;
    line-height: 30px;
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }

  .arrow-right {
    width: 8px;
    height: 16px;
    float: right;
    margin-top: 7px;
    margin-right: 15px;
  }


  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
.mu-list {
  height: 578px;
  padding: 8px 0;
  width: 100%;
  position: relative;
  overflow-y: scroll;
  /* overflow-x: hidden;
    overflow-y: visible; */
}
.list_title {
  position: relative;
  padding-left: 35px;
  min-height: 2.5rem;
}
.list {
  width:100%;
  height: 81px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #999;
  /* padding: 0.5rem; */
}
.list > img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
}

.list_title > span.dingtop {
  background-color: #009688;
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.2rem;
  position: absolute;
  left: 0;
}
.list_title > span.elsedingtop{
  color: #fff;
  background: #3333;
  padding: 0.2rem;
  border-radius: 0.2rem;
  position: absolute;
  left: 0;
}
.list_title > h3 {
  display: block;
  width: 16rem;
  font-weight: 700;
  text-align: left;
}
.timer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  color: #999;
}
.nomore {
  text-align: center;
  padding: 1rem 0;
}
.scroller {
  position: relative;
}

/*上拉加载特效*/
.spinner {
  margin: 0 auto;
  margin-bottom: 3rem;
  width: 32px;
  height: 32px;
  position: relative;
}

.cube1,
.cube2 {
  background-color: #67cf22;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
