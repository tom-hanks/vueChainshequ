<template>
  <div class="form-fu">
    <div class="title_top">
        <h2 class="title_title">个人中心</h2>
    </div>
      <div class="form-class" v-if="!accesstoken">
        <input class="login" type="text"  @keyup.13="stoken()" placeholder="请输入token进行登录" v-model="tokenText">
        <button class="form-button" type="submit" @click="stoken()" value="提交2">登录</button>
      </div>
      <main class="main" v-if="accesstoken">
        <img  v-bind:src="userAngth.avatar_url">
        <span  class="name">{{userAngth.loginname}}</span>
        <div class="timer"><span>积分：{{jifen}}</span> <span>注册时间：{{create_at | timeago}}</span></div>
        <div class="selection">
          <ul>
            <li v-for="(item,index) in loginSuccess">
              <div class="selection_li_top" @click="show_child(index)"> 
                <span 
                v-bind:class='item.icont' 
                class="icom iconfont "></span>
                <div class="title_sele"><p>{{item.li_title}}</p><span>{{item.numberLength}}个</span></div>
                <div class="selection_li_top_right  iconfont icon-fanhui"
                 v-bind:class="item.huifu_zong?'selection_li_top_right450':'selection_li_top_right270'"
                 ></div>
              </div>
              <p 
              v-if="item.huifu_zong"  
              v-for="(item2,index) in item.er_content"  
              class="add_child" ><i class="iconfont icon-wenjian1"></i></i><span>{{item2.title}}</span></p>
            </li>
          </ul>
        </div>
      </main> 
        <button v-if="accesstoken" class="loginOut" @click="loginOut()"> 退出</button>
        <login-tan v-bind:loginTanFlag="login_bg" @changesbox="showDialog"></login-tan>
  </div>
</template>
<script>
import { apis } from "../api/hostApi.js";
import timeago from "timeago.js";
import loginTan from "../components/lopginalaert";
export default {
  name: "wode",
  components: {
    loginTan
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      inputtext: {},
      tokenText: "",
      accesstoken: "",
      userAngth: "", //登录的一些信息
      jifen: "", //积分
      create_at: "", //注册时间,
      login_bg: {
        typePan: false,
        tip: "密码输入错误请重试"
      },
      loginSuccess: [
        {
          li_title: "最近主题",
          icont: "icon-wenjian3",
          numberLength: 0,
          huifu_zong: false,
          er_content: []
        },
        {
          li_title: "最近回复",
          icont: "icon-youjian",
          numberLength: 0,
          huifu_zong: false,
          er_content: []
        },
        {
          li_title: "收藏主题",
          icont: "icon-material",
          numberLength: 0,
          huifu_zong: false,
          er_content: []
        }
      ]
    };
  },
  created() {
    if (localStorage.getItem("accesstoken")) {
      this.accesstoken = !this.accesstoken;
      this.obtain();
    }
  },
  filters: {
    timeago(val) {
      console.log(val);
      let time = new Date(val);
      let thistime = timeago();
      return thistime.format(time, "zh_CN"); //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
  mounted() {},
  methods: {
    stoken() {
      //输入token点击登录
      if (this.accesstoken) {
      }
      let $eit = this;
      this.$http
        .post(apis + "/accesstoken", {
          accesstoken: $eit.tokenText //6b1374b4-00fa-43e9-847a-344a5155afac
        })
        .then(response => {
          console.log(response.data);
          localStorage.setItem("accesstoken", this.tokenText);
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("loginname", response.data.loginname);
          this.accesstoken = localStorage.getItem("accesstoken");
          this.obtain();
        })
        .catch(function(error) {
          console.log(error);
          $eit.login_bg.typePan = true;
          // alert('输入的秘钥错误')
        });
    },
    show_child(index) {
      //点击展开列表
      if (this.loginSuccess[index].numberLength > 0) {
        this.hui_zong_i = index;
        this.loginSuccess[index].huifu_zong = !this.loginSuccess[index]
          .huifu_zong;
      }
    },
    obtain() {
      //每次刷新获取本地token登录
      let $eit = this;
      this.$http
        .get(apis + "/user/" + localStorage.getItem("loginname"))
        .then(response => {
          if (response.status == 200) {
            console.log("刷新页面返回的========");
            console.log(response.data.data);
            $eit.userAngth = response.data.data;
            $eit.loginSuccess[0].numberLength =
              response.data.data.recent_topics.length;
            $eit.loginSuccess[1].numberLength =
              response.data.data.recent_replies.length;
            $eit.loginSuccess[2].numberLength =
              response.data.data.collect_topics.length;
            $eit.loginSuccess[0].er_content = response.data.data.recent_topics;
            $eit.loginSuccess[1].er_content = response.data.data.recent_replies;
            $eit.loginSuccess[2].er_content = response.data.data.collect_topics;
            $eit.jifen = response.data.data.score;
            $eit.create_at = response.data.data.create_at;
          }
        })
        .catch(function(error) {
          alert("我是刷新出的错");
          console.log(error);
        });
    },
    loginOut() {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("loginname");
      window.location.reload();
    },
    showDialog(data) {
      if (data == false) {
        this.login_bg.typePan = false;
      } else {
        this.login_bg.typePan = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
a {
  color: #42b983;
}

.form-fu {
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.form-class {
  margin-top: 3.125rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -7.375rem;
}
.login {
  width: 14.75rem;
  height: 2.125rem;
  padding-left: 1rem;
  border: 1px solid #009688;
  border-radius: 0.5rem;
}
.form-button {
  display: block;
  width: 6rem;
  height: 2rem;
  border-radius: 0.4rem;
  background: #009688;
  margin: 0 auto;
  margin-top: 3rem;
  color: #fff;
}
.form-fu .title_top {
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
.form-fu .title_title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1.25rem;
  font-size: 1.125rem;
}
.main {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: 5rem 0;
  margin-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
}
.main > img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin: 1rem 0;
}
.main > .name {
  display: block;
  text-align: center;
  color: #009688;
  height: 2.375rem;
  font-weight: 700;
  font-size: 24px;
}
.timer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  width: 60%;
  margin: 1rem 0;
}
.selection {
  width: 100%;
  height: 16.5rem;
  overflow-y: scroll;
}
.selection > ul {
  width: 100%;
}
.selection > ul > li {
  width: 98%;
  /* border:1px solid red; */
  margin-bottom: 0.9375rem;
  position: relative;
}
.selection > ul > li .selection_li_top {
  width: 100%;
  height: 3.5rem;
  /* border:1px solid blue; */
  position: relative;
}
.selection_li_top .icom {
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 1.375rem;
  color: #009688;
  position: absolute;
  top: 50%;
  left: 1.25rem;
  margin-top: -0.9375rem;
}
.selection_li_top > .title_sele {
  width: 50%;
  float: left;
  margin-left: 3.5rem;
  height: 3.125rem;
}
.selection_li_top > .title_sele > p {
  text-align: left;
  font-size: 16px;
  max-width: 100%;
}
.add_child {
  width: 100%;
  height: 3.5rem;
  padding-left: 20%;
  box-sizing: border-box;
  position: relative;
}
.add_child > i {
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 1.375rem;
  color: #009688;
  /* background: green; */
  position: absolute;
  top: 50%;
  left: 3.5rem;
  margin-top: -0.9375rem;
}
.add_child > span {
  float: left;
  display: inline-block;
  width: 80%;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 3.5rem;
  line-height: 3.5rem;
  padding-left: 1rem;
  font-size: 16px;
}
.selection_li_top > .title_sele > span {
  float: left;
  background-color: #009688;
  color: #fff;
  padding: 0.05rem 0.3rem;
  border-radius: 0.2rem;
  /* margin-top: 2rem; */
}
.selection_li_top_right {
  float: right;
  width: 12%;
  height: 3.125rem;
  line-height: 3.125rem;
  font-size: 1.25rem;
}
.selection_li_top_right270 {
  transform: rotate(270deg);
}
.selection_li_top_right450 {
  transform: rotate(450deg);
}
.loginOut {
  width: 9.375rem;
  height: 1.875rem;
  border-radius: 0.937rem;
  color: #fff;
  background: #009688;
}
</style>
