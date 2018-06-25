<template>
  <div class="hello">
    <!-- <h2>我是切换导航组件</h2> -->
      <ul class="nav_tab" v-bind:class="message">
        <li v-for="(item,index) in tabs" v-bind:class="{cur:selected===index}" v-on:click="changeTab(index)">{{item.tab}}</li>
      </ul>
      <div class="contentFu">
          <div  class="mu-list">
                      <section  class="list" v-for="(item,idnex) in tabs[selected].tabContent">
                          <img  class="" v-bind:src="item.author.avatar_url"  alt="user">
                          <div  class="content">
                              <div  class="list_title clearfix">
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
                    <p class="loading">{{loading}}</p>
          </div>
      </div>

      <!-- 上拉加载特效 -->
      <!-- <div class="spinners" v-show='jiazai'>
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["message"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      selected: 0,
      loading:'正在加载中',
      tabs: [
        {
          tab: "全部",
          tabName: "all", //请求要带的标识
          down_data_num: 1,
          tabContent: [] //属于各自的数组，存各自的东西，为空的时候才触发请求
        },
        {
          tab: "精华",
          tabName: "good",
          down_data_num: 1,
          tabContent: []
        },
        {
          tab: "weex",
          tabName: "weex",
          down_data_num: 1,
          tabContent: []
        },
        {
          tab: "分享",
          tabName: "share",
          down_data_num: 1,
          tabContent: []
        },
        {
          tab: "问答",
          tabName: "ask",
          down_data_num: 1,
          tabContent: []
        },
        {
          tab: "招聘",
          tabName: "job",
          down_data_num: 1,
          tabContent: []
        }
      ],
      ajaxdata: [],
      down_data_num: 1,
      items: [],
      tab_ajax: "all",
      ok_data: false,
      jiazai: true
    };
  },
  created() {
    //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  mounted() {
    this.ajaxHomeList(1, 1, this.tab_ajax);
    var el = this;
  //文档高度
      function getDocumentTop() {
          var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
          if (document.body) {
              bodyScrollTop = document.body.scrollTop;
          }
          if (document.documentElement) {
              documentScrollTop = document.documentElement.scrollTop;
          }
          scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;    return scrollTop;
      }
//可视窗口高度
      function getWindowHeight() {
          var windowHeight = 0;    if (document.compatMode == "CSS1Compat") {
              windowHeight = document.documentElement.clientHeight;
          } else {
              windowHeight = document.body.clientHeight;
          }
          return windowHeight;
      }
//滚动条滚动高度
      function getScrollHeight() {
          var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
          if (document.body) {
              bodyScrollHeight = document.body.scrollHeight;
          }
          if (document.documentElement) {
              documentScrollHeight = document.documentElement.scrollHeight;
          }
          scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;    return scrollHeight;
      }
   window.addEventListener("scroll", function() {
      if(getScrollHeight() == getWindowHeight() + getDocumentTop()){
        //当滚动条到底时,这里是触发内容
          el.tabs[el.selected].down_data_num += 1;
          el.ajaxHomeList(el.tabs[el.selected].down_data_num, 2, el.tab_ajax);
          console.log("到达底部");

      }
    });
    // console.log('默认加载');
    // console.log( document.querySelector('.mu-list'))
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
            // console.log('返回数据的长度---'+response.data.data.length)
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
    changeTab(index) {
      this.selected = index;
      this.tab_ajax=this.tabs[this.selected].tabName;
      if (this.tabs[this.selected].tabContent <= 0) {
        this.tab_ajax=this.tabs[this.selected].tabName;
        this.ajaxHomeList(
          this.down_data_num,
          2,
          null,
          this.tabs[this.selected].tabName
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .hello {
    position: absolute;
    top: 4.2rem;
} */
.hello{
  margin-top: 4.2rem;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.header_style0 {
  background: #7e57c2;
  color: #fff;
}
.header_style1 {
  background-color: #474a4f;
  color: #ffffff;
}
.header_style2 {
  /* height: 1.6rem; */
  background-color: #009688;
  color: #ffffff;
}
ul.nav_tab {
  display: flex;
  -webkit-box-pack: justify;
  width: 100%;
  position: fixed;
  top: 4.2rem;
  z-index: 2;

}

li {
  height: 1.5rem;
  line-height: 1.5rem;
  width: 100%;
  display: inline-block;
}
li.cur {
  color: #fff;
  border-bottom: 2px solid red;
}
a {
  color: #42b983;
}
.mu-list {
  /* height:29.125rem; */
  padding: 8px 0;
  width: 100%;
  margin-top: 6rem;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;  
  overflow-x: hidden;
  overflow-y: visible;
}
.list{
  display: flex;
  padding: .7rem;
  z-index: 1
}
.list img{
  width: 3rem;
  height: 3rem;
}
.list_title{
  box-sizing: border-box;
  padding-left: 0.65rem;
}
.list_title>h3{
  float: left;
  width: 87%;
  box-sizing: border-box;
  overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    break-word: break-all;
  padding-left: 0.25rem;
      font-weight: 700;
  text-align: left;
}
span.dingtop{
  background: #369219;
}
span.elsedingtop{
  background-color: rgb(153, 153, 153);
}
span.dingtop,span.elsedingtop{
  float: left;
  color:#fff;
  padding: .1rem .25rem;
  border-radius: .225rem
}
.content{
  flex:1;
}
.timer{
  padding-left: 3rem;
  display: flex;
  justify-content: space-between;
  color:#9999;
  margin-top: .3rem;
  text-align: left;
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
