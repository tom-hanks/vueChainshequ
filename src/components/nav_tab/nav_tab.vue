<template>
  <div class="hello">
    <!-- <h2>我是切换导航组件</h2> -->
    <!-- <ul class="nav_tab" v-bind:class="message">
        <li v-for="(item,index) in tabs" v-bind:class="{cur:selected===index}" :key="index" v-on:click="changeTab(index,item.tabName)">{{item.tab}}</li>
    </ul>-->
    <div class="contentFu">
      <div class="list-content" id="list-content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10">
            <div class="list-item">
              <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->
              <section class="list" v-for="(item,idnex) in ajaxdata" :key="idnex">
                <router-link :to="{path:'banana',param:{color:'yellow'}}" tag="em"></router-link>
                <img class :src="item.author.avatar_url" @error="defImg()" alt="头像" />

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
              <p v-if="notData" style="background:red">----加载完毕----</p>
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
      defaultImg: require("../../assets/logo.png"),
      // loading: "正在加载中",
      list: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      cswindex: 0,
      ajaxdata: [],
      notData: false,
      items: [],
      tab_ajax: "all",
      ok_data: false,
      jiazai: true
    };
  },
  watch: {
    tabData: {
      handler(newValue, oldValue) {
        this.init()
      },
      deep: true
    }
  },
  created() {
    //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    // console.log("测缓存");
  },
  mounted() {},
  methods: {
    ...mapActions(["getNormalDataList"]),
    init() {
      this.notData = false;
      this.onRefresh();
    },
    onLoad() {
      console.log("什么ssss====");
      //上拉加载
      this.cswindex += 1;
      this.getList(this.cswindex);
    },
    onRefresh() {
      //下拉刷新
      this.finished = false;
      this.isLoading = false;
      
      this.cswindex = 0;
      this.ajaxdata = [];
      this.getList(this.cswindex);
    },
    shishi() {
      console.log("父传=====", this.tabData);
    },
    defImg() {
      let img = event.srcElement;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    async getList(currPage) {
      let params = {
        data: {
          page: currPage,
          tab: this.tabData.tabCode
        },
        url: apiV1Topics
      };
      let res = await this.getNormalDataList(params);
      this.loading = false;

      this.ajaxdata = [...this.ajaxdata, ...res];
      console.log("请求回来=====", this.ajaxdata);
      if (res.length < 20) {
        // alert('没了')
        this.notData = true;
        // console.log('返回数据的长度---'+response.data.data.length)
        this.finished = true;
        this.ok_data = true;
        // this.loading = "已加载全部";
        return false;
      } else {
        // this.loading = "正在加载中";
      }
      console.log("这是什么鸡儿=======", res);
    }
  },
  destroyed() {
    this.tab_ajax = [];
    // window.removeEventListener("scroll", this.panduanweizhi, false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "./nav_tab.scss";
</style>
