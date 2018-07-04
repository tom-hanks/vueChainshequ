<template>
  <div class="wode">
    <div class="title_top">
        <span class="iconfont icon-fanhui1 title_jiantou fl" @click="back_page()"></span>
        <h2 class="title_title">{{title}}</h2>
    </div>
    <!-- {{content}} -->
    <div class="md_header">
      <div v-for="(item,index) in tabArry" v-if="item.id == tabName " class="content_title">
        <span>{{item.name}}</span>{{title}}
      </div>
      <!-- 登陆后显示收藏 -->
        <div class="shoucang"
        @click="collectfunction(authorImase.id)"
        >
        <span class="iconfont  shoucang_icon fl"
        v-bind:class="shouchang_pan?'icon-shoucang2':'icon-shoucang1'"
        ></span>
        <h1 class="fl shoucang_icon_h1">{{collect_text}}</h1>
        </div>
        <div class="label"><span>发布于 {{authorImase.create_at | timeago}}</span> <span>作者 {{authorImase.author.loginname}}</span> <span>{{authorImase.visit_count}} 次浏览</span> <span v-for="(item,index) in tabArry" v-if="item.id == tabName ">来自 {{item.name}}</span></div>
    </div>
    <div v-html="conten_Txt" class="conten">{{ conten_Txt }}</div>
    <!-- 回复框 -->
    <div class="renl clearfixed">
      <textarea name="" id="renl_textarea" 
      v-model="renl_textarea"
      placeholder="请输入回复内容"></textarea>
      <button class="renl_button" @click="renl_fabiao()">发表</button>
    </div>
    <ul class="replies">
        <li class="replies_li_first">{{huifuNum}}条回复{{renl_hide}}</li>
        <li class="reply" v-for="(item,index) in huifuConnten">
            <section class="msg">
                <div class="author">
                  <img class="" v-bind:src="item.author.avatar_url" alt="user"> 
                  <span class="name">{{item.author.loginname}}</span> 
                  <span class="timer">{{index+1}}楼 • {{item.create_at | timeago}}</span>
                </div> 
                  <span class="iconfont right_huifu icon-huifu" @click="huifu(index,2)"></span>
                  <div class="ups" @click="Like_ups(item.id,index)">
                    <i class="mu-icon iconfont icon-dianzan  material-icons" style="font-size: 16px; width: 16px; height: 16px;"></i> 
                    <span>{{item.ups.length}}</span>
                  </div>
            </section> 
            <p class="markdown-text2" v-html="item.content">
              {{item.content}}
              <!-- <div >
                <p>这个很赞，做的很细心，</p>
              </div> -->
            </p>

                <!-- 回复框 -->
                <div class="renl clearfixed" v-if='renl_shuru == index && renl_hide'>
                  <textarea name="" id="renl_textarea"  class="renl_textarea2"
                  v-model="renl_textarea2" placeholder="请输入回复内容" ></textarea>
                  <button class="renl_button" @click="renl_fabiao(item.id)" v-if='renl_hide'>发表</button>
                  <button class="renl_quxiao" @click="huifuquxiao()">取消</button>
                </div>
          </li>
    </ul>
    <transition  name="fade"  mode="out-in">
      <login-tan  v-bind:loginTanFlag="login_bg" @changesbox="showDialog"></login-tan>
    </transition>
  </div>
</template>
<script>
import timeago from "timeago.js";
import { apis } from "../api/hostApi.js";
import loginTan from "../components/lopginalaert";
export default {
  name: "wode",
  components: {
    loginTan
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      title: "",
      authorImase: {
        author: ""
      },
      login_bg: {
        typePan: false,
        tip: "父组件传值控制显示隐藏",
        num: 2
      },
      tabName: "",
      tabArry: [
        { id: "all", name: "全部" },
        { id: "good", name: "精华" },
        { id: "weex", name: "weex" },
        { id: "share", name: "分享" },
        { id: "ask", name: "问答" },
        { id: "job", name: "招聘" }
      ],
      conten_Txt: "",
      huifuNum: 0,
      huifuConnten: "",
      collect_id: "",
      collect_style: false,
      collect_text: "",
      collectfunction: this.collect,
      Like_id: "",
      Like_style: false,
      shouchang_pan: false,
      renl_textarea: "",//一级评论的v-model的参数
      renl_textarea2:"",//二级评论的v-model的参数
      renl_shuru:-1,//点击哪个评论显示哪条
      renl_hide:false,//点击@评论全部隐藏
      cun_loginname:'',//@的时候存@的昵称
      accesstoken: "" //判断有没有token
    };
  },
  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
    if (!this.accesstoken) {
      this.collect_text = "收藏主题";
    }
  },
  filters: {
    timeago(val) {
      let time = new Date(val);
      let thistime = timeago();
      return thistime.format(time, "zh_CN"); //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
  mounted() {
    this.getData(); //请求文章详情
  },
  watch: {
    collect_style(newvalue, oldvalue) {
      if (newvalue) {
        this.collect_text = "收藏主题";
      } else {
        this.collect_text = "取消主题";
      }
      console.log("--------------");
      // console.log(newvalue);
    },
    renl_textarea(newvalue) {
      console.log(newvalue);
    },
    login_bg: {
      //监听用做显示2s自动隐藏
      handler: function(val, oldVal) {
        console.log("watch--------------");
        let $eit = this;
        if (val.typePan == true && val.tip == "恭喜您，发表成功！")
          var timer = setTimeout(function() {
            $eit.login_bg.typePan = false;
            console.log($eit);
          }, 2000);
      },
      deep: true
    }
  },
  methods: {
    getData() {
      //请求文章详情
      let that = this; //请求文章详情
      this.$http
        .get(apis + "/topic/" + this.$route.params.id)
        .then(response => {
          this.authorImase = response.data.data;
          this.title = response.data.data.title;
          this.tabName = response.data.data.tab;
          this.collect_id = response.data.data.id;
          this.conten_Txt = response.data.data.content;
          this.huifuNum = response.data.data.replies.length;
          this.huifuConnten = response.data.data.replies;
          console.log(response.data.data.replies);
          console.log("二");
          that.getcollected();
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log("三");
    },
    back_page() {
      //返回上个路由
      this.$router.back(-1);
    },
    collect(val) {
      //收藏主题
      if (!this.accesstoken) {
        this.login_bg.typePan = true;
        this.login_bg.tip = "尚未登录，请登陆后收藏";
      } else {
        let that = this;
        this.$http
          .post("https://www.vue-js.com/api/v1/topic/collect", {
            topic_id: val
          })
          .then(response => {
            if (response.data.success) {
              that.collect_text = "取消收藏";
              that.collectfunction = that.delcollect;
            }
            // console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    delcollect(val) {
      //取消收藏
      if (!this.accesstoken) {
        this.login_bg.typePan = true;
      } else {
        let that = this;
        this.$http
          .post("https://www.vue-js.com/api/v1/topic/de_collect", {
            topic_id: val
          })
          .then(response => {
            if (response.data.success) {
              this.collect_text = "收藏主题";
              that.collectfunction = that.collect;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getcollected() {
      //获取这个账号的收藏信息
      if (this.accesstoken) {
        let $eit = this;
        this.$http
          .get(apis + "/user/" + localStorage.getItem("loginname"))
          .then(response => {
            let arr = response.data.data.collect_topics;
            console.log("我是id");
            console.log(response.data.data);
            for (let i = 0; i <= arr.length - 1; i++) {
              if (arr[i].id == $eit.collect_id) {
                this.collect_text = "取消收藏";
                this.collect_style = false;
                this.collectfunction = this.delcollect;
                return false;
              } else {
                this.collect_text = "收藏主题";
                this.collect_style = true;
                this.collectfunction = this.collect;
              }
              // console.log(arr[i].id);
            }
          })
          .catch(function(error) {
            alert("我是刷新出的错");
            console.log(error);
          });
      }
    },
    Like_ups(list_id, Index) {
      //ups点赞
      if (!this.accesstoken) {
        this.login_bg.typePan = true;
      } else {
        let that = this;
        this.$http
          .post(apis + "/reply/" + list_id + "/ups")
          .then(response => {
            if (response.data.success) {
              this.getData(); //请求文章详情
            }
            if (response.data.error_msg) {
              this.login_bg.typePan = true;
              this.login_bg.num = 1;
              this.login_bg.tip = response.data.error_msg;
            }
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    renl_fabiao(val) {
      //发表评论
      if (!this.accesstoken) {
        this.login_bg.typePan = true;
        this.login_bg.tip = "尚未登录，请登陆后收藏";
      } else {
        //获取这个账号的收藏信息
        let $eit = this;
        let $texrt='';
          if($eit.renl_hide){
             $texrt =$eit.renl_textarea2
          }else{
             $texrt =$eit.renl_textarea
          }
          this.$http
          .post(apis + "/topic/" + this.$route.params.id + "/replies", {
            content: $eit.cun_loginname+$texrt,
            reply_id:val
          })
          .then(response => {
            if (response.data.success) {
              this.login_bg.typePan = true;
              this.login_bg.num = 0;
              this.renl_textarea='';
              this.renl_hide=false;
              this.login_bg.tip = "恭喜您，发表成功！";
              this.getData(); //请求文章详情
              $eit.renl_textarea = "";
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    huifu(val,index){//二级评论的点击事件
      if (!this.accesstoken) {
        this.login_bg.typePan = true;
        this.login_bg.tip = "尚未登录，请登陆后评论";
      }else{
          this.renl_hide=true;
          this.renl_shuru=val;
          if(index == 2){
                let $eit=this;
                this.huifuConnten.map(function(item, i) {
                    if(val === i ){
                      $eit.renl_textarea2='@'+item.author.loginname+' ';
                    }
                })
           }
      }
    },
    huifuquxiao(){//取消二级回复的评论框
      this.renl_hide=false;
      
    },
    showDialog(data) {
      //获取子组件传过来的参数（弹窗点击关闭）
      if (data == false) {
        this.login_bg.typePan = false;
      } else {
        this.login_bg.typePan = true;
      }
      console.log("我是子组件打印");
      console.log(data);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wode /deep/ img {
  display: inline-block;
  width: 100%;
}
.wode /deep/ .prettyprint {
  font-family: Monaco, Menlo, Consolas, Courier New, monospace;
  font-size: 14px;
  border-radius: 0;
  padding: 1rem;
  border: 0;
  margin: 1rem 0;
  border-width: 1px 0;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
}
.wode /deep/ img {
  display: inline-block;
  width: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.625rem;
}
a {
  color: #42b983;
}
.wode /deep/ .title_top {
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
  z-index: 2;
}
.wode /deep/ .title_title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1.25rem;
  font-size: 1.125rem;
}
.title_jiantou {
  width: 3.125rem;
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: center;
}
.conten {
  border-top: 1px solid #e5e5e5;
}
.content_title {
  padding: 1rem;
  font-size: 22px;
  margin: 0.67em 0;
  margin-top: 3.125rem;
  font-weight: 900;
  text-align: left;
}
.content_title > span {
  background-color: #009688;
  color: #fff;
  font-size: 16px;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
}
.wode /deep/ .markdown-text > p {
  padding: 0 1rem;
  font-size: 15px;
  line-height: 1.7em;
  margin-top: 1rem;
  overflow: auto;
  text-align: left;
}

.md_header {
  padding-bottom: 0.5rem;
}
.md_header .label span {
  font-size: 12px;
  color: #838383;
  font-weight: 400;
  padding: 0 0.2rem;
}
.md_header .label span:before {
  content: "\2022";
  padding: 0 0.25rem;
}
.wode /deep/ .markdown-text h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.wode /deep/ .markdown-text h2 {
  font-size: 1.625rem;
  margin: 0.67em 0;
  border-bottom: 1px solid #eee;
}
.wode /deep/ .markdown-text h3 {
  font-size: 1.53125rem;
  border-bottom: 1px solid #eee;
}
.wode /deep/ .markdown-text h2,
.wode /deep/ .markdown-text h3 {
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
}
.wode /deep/ .md_header .label {
  text-align: left;
  margin: 0.5rem 1rem;
}
.shoucang {
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: left;
  margin: 0.5rem 1rem;
}
.shoucang_icon {
  font-size: 25px;
}
.shoucang_icon_h1 {
  font-size: 16px;
  color: #009688;
  font-weight: 800;
  margin-left: 0.9125rem;
}
.renl_button {
  display: block;
  position: absolute;
  right: 1.1rem;
  bottom: 0;
  background: #009688;
  padding: 0.1875rem 1.25rem;
  color: #fff;
}
.wode /deep/ .renl {
  /* width: 100%; */
  /* height: 100px; */
  margin: 0.5rem 1rem;
  position: relative;
}
.wode /deep/ #renl_textarea {
  display: inline-block;
  margin: 1.5rem 1rem;
  width: 90%;
  height: 9.75rem;
  padding: 0.625rem;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ccc;
}
.wode /deep/ #renl_textarea.renl_textarea2{
  margin-top: 0;
} 
.wode /deep/ .markdown-text h1,
.wode /deep/ .markdown-text h2,
.wode /deep/ .markdown-text h3,
.wode /deep/ .markdown-text h4,
.wode /deep/ .markdown-text h5,
.wode /deep/ .markdown-text h6 {
  font-weight: 700;
  text-align: left;
  margin: 0.5rem 1rem;
  padding-bottom: 0;
}
.wode /deep/ .markdown-text a {
  display: block;
  color: #ff4081;
}
.wode /deep/ .right_huifu{
  float: left;
}
.wode /deep/ .markdown-text pre {
  font-family: Monaco, Menlo, Consolas, Courier New, monospace;
  font-size: 14px;
  text-align: left;
  border-radius: 0;
  padding: 1rem;
  border: 0;
  margin: 1rem;
  border-width: 1px 0;
  background: #f7f7f7;
  white-space: pre-wrap;
  word-break: break-all;
}
.wode /deep/ .markdown-text blockquote p {
  padding: 0 1rem;
  text-align: left;
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
}
.wode /deep/ .markdown-text ul li {
  text-align: left;
  padding: 0.15rem 1rem;
}
/*评论*/
.replies_li_first {
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  background-color: #f6f6f6;
  padding: 1rem;
  margin: 0;
}
.replies {
  width: 100%;
  border-top: 1px solid #f0f0f0;
}
.replies > li {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
}
.reply > .msg {
  /* display: -webkit-box; */
  /* display: -ms-flexbox; */
  /* display: flex; */
  /* -webkit-box-pack: justify; */
  /* -ms-flex-pack: justify; */
  /* justify-content: space-between; */
  padding-bottom: 1rem;
}
.author{
  float: left;
}
.author > img {
  width: 2rem;
  height: 2rem;
  vertical-align: top;
}
.author > .name {
  color: #666;
  font-weight: 700;
}
.author > .timer {
  color: #08c;
}
.wode /deep/ .right_huifu{
  float: right
}
.wode /deep/ .markdown-text2 > .markdown-text {
  display: block;
  /* margin-bottom:1rem; */
  text-align: left;
}
.wode /deep/ .markdown-text2 > .markdown-text > p {
  margin-top: 1rem;
  width: 100%;
  text-align: left;
  padding: 1rem 0;
  padding-bottom: 0;
}
.ups{
  float: right;
  margin-right: 1rem;
}
.ups > i,
.ups > span {
  color: #009688;
}
.renl_quxiao{
      display: block;
    position: absolute;
    right: 6.1rem;
    bottom: 0;
    background: #ccc;
    padding: 0.1875rem 1.25rem;
    color: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
