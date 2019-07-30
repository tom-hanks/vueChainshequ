<template>
  <div class="hello">
    <!-- <h2>我是切换导航组件</h2> -->
    <!-- <ul class="nav_tab" v-bind:class="message">
        <li v-for="(item,index) in tabs" v-bind:class="{cur:selected===index}" :key="index" v-on:click="changeTab(index,item.tabName)">{{item.tab}}</li>
    </ul>-->
    <div class="contentFu">
      <!-- <div class="mu-list">
        <section class="list" v-for="(item,idnex) in ajaxdata" :key="idnex">
          <router-link :to="{path:'banana',param:{color:'yellow'}}" tag="em"></router-link>
          <img class v-bind:src="item.author.avatar_url" alt="user" />

          <router-link :to="{name:'details',params:{id:item.id}}" class="content" tag="div">
            <div class="list_title clearfix">
              <span v-if="item.top" class="dingtop">置顶</span>
              <span v-else-if="item.top === false&&item.tab==='ask'" class="elsedingtop">问答</span>
              <span v-else-if="item.top === false&&item.tab==='share'" class="elsedingtop">分享</span>
              <span v-else-if="item.top === false&&item.tab==='good'" class="elsedingtop">精华</span>
              <span v-else-if="item.top === false&&item.tab==='weex'" class="elsedingtop">weex</span>
              <span v-else-if="item.top === false&&item.tab==='job'" class="elsedingtop">招聘</span>
              <h3>{{item.title}}</h3>
            </div>
            <div class="timer">
              <span>179 / 117440</span>
              <span>2天前</span>
            </div>
          </router-link>
        </section>
        
        <p class="loading">{{loading}}</p>
      </div>-->
      <div class="list-content" id="list-content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10">
            <div class="list-item">
              <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->
              <section class="list" v-for="(item,idnex) in ajaxdata" :key="idnex">
                <router-link :to="{path:'banana',param:{color:'yellow'}}" tag="em"></router-link>
                <img class v-bind:src="item.author.avatar_url" alt="user" />

                <router-link :to="{name:'details',params:{id:item.id}}" class="content" tag="div">
                  <div class="list_title clearfix">
                    <span v-if="item.top" class="dingtop">置顶</span>
                    <span v-else-if="item.top === false&&item.tab==='ask'" class="elsedingtop">问答</span>
                    <span v-else-if="item.top === false&&item.tab==='share'" class="elsedingtop">分享</span>
                    <span v-else-if="item.top === false&&item.tab==='good'" class="elsedingtop">精华</span>
                    <span v-else-if="item.top === false&&item.tab==='weex'" class="elsedingtop">weex</span>
                    <span v-else-if="item.top === false&&item.tab==='job'" class="elsedingtop">招聘</span>
                    <h3>{{item.title}}</h3>
                  </div>
                  <div class="timer">
                    <span>179 / 117440</span>
                    <span>2天前</span>
                  </div>
                </router-link>
              </section>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { apiV1Topics } from "../../api/hostApi";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "HelloWorld2",
  props: {
    message: {
      type: String
    },
    tabData: {
      type: Object
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      selected: 0,
      // loading: "正在加载中",
      list: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
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
  activated: function() {
    // window.addEventListener("scroll", this.panduanweizhi);
  },
  deforeDestroy () {
    alert('sss')
    // window.removeEventListener("scroll", this.panduanweizhi, false);
  },
  watch: {
    tab_ajax(newvalue) {
      this.tab_ajax = newvalue;
    },
    selected(newvalue) {
      // console.log(this.tabs[this.selected].tabContent.length);
      // if (this.tabs[this.selected].tabContent.length > 0) {
      //   this.tabs[this.selected].tabContent = [];
      //   this.changeTab(newvalue, this.tab_ajax); //为了解决因为keep-alive缓存导致不执行的问题，所以监听触发
      // }

      // console.log(newvalue);
    }
  },
  created() {
    //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    // console.log("测缓存");
  },
  mounted() {
    // this.getList(1, 1, this.tab_ajax);
    var el = this;

    let winHeight = document.documentElement.clientHeight; //视口大小
    document.getElementById("list-content").style.height =
      winHeight - 46 + "px"; //调整上拉加载框高度
    // window.addEventListener("scroll", this.panduanweizhi);
  },
  methods: {
    ...mapActions(["getNormalDataList"]),
    onLoad() {
      console.log("什么ssss====");
      //上拉加载
      // setTimeout(() => {
      //   for (let i = 0; i < 8; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;
      //   if (this.list.length >= 60) {
      //     this.finished = true;
      //   }
      // }, 500);

        this.tabs[this.selected].down_data_num += 1;
        this.getList(this.tabs[this.selected].down_data_num, 2, this.tab_ajax);
    },
    onRefresh() {
      //下拉刷新
      // setTimeout(() => {
      //   this.finished = false;
      //   this.isLoading = false;
      //   this.list = [];
      //   this.onLoad();
      // }, 500);
        this.finished = false;
        this.isLoading = false;
        this.tabs[this.selected].down_data_num =1;
        this.ajaxdata = [];
        this.getList(this.tabs[this.selected].down_data_num, 2, this.tab_ajax);
    },
    shishi() {
      console.log("父传=====", this.tabData);
    },
    async getList(a, b, d) {
      let params = {
        data: {
          page: a,
          tab: d
        },
        url: apiV1Topics
      };
      let res = await this.getNormalDataList(params);
      this.loading = false;
      this.ajaxdata = [...this.ajaxdata,...res];
      console.log('请求回来=====',this.ajaxdata)
      if (res.length < 20) {
        // console.log('返回数据的长度---'+response.data.data.length)
        this.finished = true;
        this.ok_data = true;
        // this.loading = "已加载全部";
        return false;
      } else {
        // this.loading = "正在加载中";
      }
      console.log("这是什么鸡儿=======", res);
    },
    // ajaxHomeList(a, b, d) {
    //   //a：是页码，从1开始；b：等于1的时候是下拉刷新，等于2就是上拉加载更多，c：传入的done 点激的时候没有；d：//请求要带的标识
    //   this.$http
    //     .get("https://www.vue-js.com/api/v1/topics", {
    //       params: { tab: d, page: a }
    //     })
    //     .then(response => {
    //       // console.log("2222");

    //       // console.log(response.data.data.length);

    //       if (b == 1) {
    //         // 顶部
    //         this.tabs[this.selected].tabContent = [];
    //         this.tabs[this.selected].tabContent = this.tabs[
    //           this.selected
    //         ].tabContent.concat(response.data.data);
    //         // console.log(this.tabs[this.selected].tabContent);
    //         // console.log("顶部");
    //       } else {
    //         // console.log('到底部')
    //         this.tabs[this.selected].tabContent = this.tabs[
    //           this.selected
    //         ].tabContent.concat(response.data.data);
    //         // console.log(this.tabs[this.selected].tabContent);
    //       }
    //       if (response.data.data.length < 10) {
    //         // console.log('返回数据的长度---'+response.data.data.length)
    //         this.ok_data = true;
    //         this.loading = "已加载全部";
    //         return false;
    //       } else {
    //         this.loading = "正在加载中";
    //       }
    //     })
    //     .catch(function(error) {
    //       // console.log(error);
    //     });
    // },
    changeTab(index, tab) {
      //切换tab选择
      this.tabs[this.selected].down_data_num = 0;
      this.selected = index;
      // this.loading = "正在加载中...";
      this.tab_ajax = this.tabs[this.selected].tabName;
      if (this.tabs[this.selected].tabContent.length <= 0) {
        this.tab_ajax = this.tabs[this.selected].tabName;
        this.getList(this.down_data_num, 2, this.tab_ajax);
      }
    },
    panduanweizhi() {
      //文档高度
      // function getDocumentTop() {
      //   var scrollTop = 0,
      //     bodyScrollTop = 0,
      //     documentScrollTop = 0;
      //   if (document.body) {
      //     bodyScrollTop = document.body.scrollTop;
      //   }
      //   if (document.documentElement) {
      //     documentScrollTop = document.documentElement.scrollTop;
      //   }
      //   scrollTop =
      //     bodyScrollTop - documentScrollTop > 0
      //       ? bodyScrollTop
      //       : documentScrollTop;
      //   return scrollTop;
      // }
      //可视窗口高度
      // function getWindowHeight() {
      //   var windowHeight = 0;
      //   if (document.compatMode == "CSS1Compat") {
      //     windowHeight = document.documentElement.clientHeight;
      //   } else {
      //     windowHeight = document.body.clientHeight;
      //   }
      //   return windowHeight;
      // }
      //滚动条滚动高度
      // function getScrollHeight() {
      //   var scrollHeight = 0,
      //     bodyScrollHeight = 0,
      //     documentScrollHeight = 0;
      //   if (document.body) {
      //     bodyScrollHeight = document.body.scrollHeight;
      //   }
      //   if (document.documentElement) {
      //     documentScrollHeight = document.documentElement.scrollHeight;
      //   }
      //   scrollHeight =
      //     bodyScrollHeight - documentScrollHeight > 0
      //       ? bodyScrollHeight
      //       : documentScrollHeight;
      //   return scrollHeight;
      // }
      // if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
      //   //当滚动条到底时,这里是触发内容
      //   this.tabs[this.selected].down_data_num += 1;
      //   this.getList(this.tabs[this.selected].down_data_num, 2, this.tab_ajax);
      //   alert("到底");
      //   // console.log("到达底部");
      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "./nav_tab.scss";
</style>
