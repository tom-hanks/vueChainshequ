<template>
  <div class="home">
    <div class="header clearfix" :class="header_bg">
      <span class="logo"></span>Vue.js 中文社区{{tab_ajax.tabCode}}
      <span id="caidan" class="caidan iconfont icon-caidan" v-on:click="bgcolor"></span>
      <transition name="slide-fade">
        <ul v-if="colorNume" class="nav_Cai">
          <li
            v-for="(items,index) in home_bg"
            :key="items.content"
            :cuncaidan="cun_caidan"
            v-on:click="style_bg(index)"
            v-bind:class="{heightliang:index===cun_caidan}"
          >{{items.content}}</li>
        </ul>
      </transition>
      <ul class="nav_tab" v-bind:class="message">
        <li
          v-for="(item,index) in tabs"
          v-bind:class="{cur:selected===index}"
          :key="index"
          v-on:click="changeTab(index,item)"
        >{{item.tabName}}</li>
      </ul>
    </div>

    <Navtab :message="header_bg" :tabData="tab_ajax" ref="mychild"></Navtab>
  </div>
</template>

<script>
// 导入组件
import Navtab from "../components/nav_tab/nav_tab";

export default {
  name: "home",
  components: {
    Navtab
  },
  props: ["message"],
  data() {
    return {
      colorNume: false,
      activeColor: "red",
      tab_ajax:{},
      home_bg: [
        { content: "LIGHT" },
        { content: "CARBON" },
        { content: "TEAL" }
      ],
      selected: 0,
      header_bg: "header_style2",
      cun_caidan: 2,
      tabs: [
        {
          tabName: "全部",
          tabCode: "all", //请求要带的标识
          down_data_num: 1,
          tabContent: [] //属于各自的数组，存各自的东西，为空的时候才触发请求
        },
        {
          tabName: "精华",
          tabCode: "good",
          down_data_num: 1,
          tabContent: []
        },
        {
          tabName: "weex",
          tabCode: "weex",
          down_data_num: 1,
          tabContent: []
        },
        {
          tabName: "分享",
          tabCode: "share",
          down_data_num: 1,
          tabContent: []
        },
        {
          tabName: "问答",
          tabCode: "ask",
          down_data_num: 1,
          tabContent: []
        },
        {
          tabName: "招聘",
          tabCode: "job",
          down_data_num: 1,
          tabContent: []
        }
      ]
    };
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
      console.log(newvalue);
    },
     $route(to,from){
      console.log('路由-----',to,from);
    }
  },
  created() {
    //页面加载完成前开始执行
    console.log("死犟");
    let body = document.querySelector("body");
    body.addEventListener(
      "click",
      e => {
        if (e.target.id != "caidan") {
          this.colorNume = false;
        }
      },
      false
    );
  },
  mounted() {
  },
  methods: {
    bgcolor() {
      this.colorNume = !this.colorNume;
    },
    style_bg(e) {
      this.cun_caidan = e;
      this.header_bg = "header_style" + e;
    },
    changeTab(index, tabName) {
      //切换tab选择
      console.log('打印====',tabName);
      this.selected = index;
      this.tab_ajax = tabName;
      this.$refs.mychild.onRefresh();
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./home.scss";
</style>
