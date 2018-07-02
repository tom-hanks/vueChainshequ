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
        @click="collect(authorImase.id)"
        ><span class="iconfont  shoucang_icon fl"
        v-bind:class="shouchang_pan?'icon-shoucang2':'icon-shoucang1'"
        ></span><h1 class="fl shoucang_icon_h1">收藏主题</h1></div>
        <div class="label"><span>发布于 {{authorImase.create_at | timeago}}</span> <span>作者 {{authorImase.author.loginname}}</span> <span>{{authorImase.visit_count}} 次浏览</span> <span v-for="(item,index) in tabArry" v-if="item.id == tabName ">来自 {{item.name}}</span></div>
    </div>
    <div v-html="conten_Txt" class="conten">{{ conten_Txt }}</div>
    <!-- 回复框 -->
    <div class="renl clearfixed">
      <textarea name="" id="renl_textarea" ></textarea>
      <button class="renl_button">发表</button>
    </div>
    <ul class="replies">
        <li class="replies_li_first">{{huifuNum}}条回复</li>
        <li class="reply" v-for="(item,index) in huifuConnten">
            <section class="msg">
                <div class="author">
                  <img class="" v-bind:src="item.author.avatar_url" alt="user"> 
                  <span class="name">{{item.author.loginname}}</span> <span class="timer">{{index+1}}楼 • {{item.create_at | timeago}}</span>
                </div> 
                  <div class="ups">
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
          </li>
    </ul>
    <login-tan v-bind:loginTanFlag="header_bg" @changesbox="showDialog"></login-tan>
  </div>
</template>
<script>
 import timeago from 'timeago.js'
 import loginTan  from '../components/lopginalaert'
export default {
  name: 'wode',
  components:{
    loginTan
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:'',
      authorImase:{
        author:'',
      },
      header_bg:false,
      tabName:'',
      tabArry:[
        {id:'all',name:'全部'},
        {id:'good',name:'精华'},
        {id:'weex',name:'weex'},
        {id:'share',name:'分享'},
        {id:'ask',name:'问答'},
        {id:'job',name:'招聘'}
      ],
      conten_Txt:'',
      huifuNum:0,
      huifuConnten:'',
      shouchang_pan:false,
      accesstoken:''//判断有没有token
    }
  },
 created(){
   this.accesstoken=localStorage.getItem('accesstoken')

  },
  filters:{
    timeago(val){
         let time = new Date(val)
            let thistime = timeago()
            return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
 mounted(){
      this.$http.get('https://www.vue-js.com/api/v1/topic/'+this.$route.params.id)
                .then((response) =>{
                  this.authorImase=response.data.data;
                  this.title=response.data.data.title;
                  this.tabName=response.data.data.tab;
                  // console.log(response.data.data.content)
                  this.conten_Txt=response.data.data.content;
                  this.huifuNum=response.data.data.replies.length;
                  this.huifuConnten=response.data.data.replies;
                  console.log(response.data.data);
                  console.log('二')
                })
              .catch(function (error) {
                console.log(error);

              });
                  console.log('三')
      console.log(this.$route.params.id)
  },
  methods:{
   back_page(){
     this.$router.back(-1);
   },
   collect(val){//收藏主题
   if(!this.accesstoken){
     this.header_bg=true;
   }else{
     let that = this
      this.$http.post('https://www.vue-js.com/api/v1/topic/collect',{
        topic_id: val
        })
                .then((response) =>{
                  console.log(response.data);
                })
              .catch(function (error) {
                console.log(error);
              });
   }

   },
   showDialog(data){
     if(data==false){
       this.header_bg=false
     }else{
       this.header_bg=true
     }
     console.log('我是子组件打印')
     console.log(data)
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wode /deep/  img{
  display: inline-block;
  width: 100%;
}
.wode /deep/ .prettyprint{
  font-family: Monaco,Menlo,Consolas,Courier New,monospace;
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
.wode /deep/  img{
  display: inline-block;
  width: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 .625rem;
}
a {
  color: #42b983;
}
.wode /deep/ .title_top{
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  display: flex;
  background: #009688;
  color: #fff;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.wode /deep/ .title_title{
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1.25rem;
  font-size: 1.125rem;
}
.title_jiantou{
  width: 3.125rem;
  height: 3.125rem;
  line-height:3.125rem;
  text-align: center;
}
.conten{
  border-top: 1px solid #e5e5e5;
}
.content_title{
  padding: 1rem;
  font-size: 22px;
  margin: .67em 0;
  margin-top: 3.125rem;
  font-weight: 900;
  text-align: left;
}
.content_title>span{
    background-color: #009688;
    color: #fff;
    font-size: 16px;
    padding: .2rem .6rem;
    border-radius: .2rem;
}
.wode /deep/ .markdown-text>p{
  padding:0  1rem;
  font-size: 15px;
  line-height: 1.7em;
    margin-top: 1rem;
  overflow: auto;
  text-align: left;
}

.md_header{
  padding-bottom: .5rem;;
}
.md_header .label span {
    font-size: 12px;
    color: #838383;
    font-weight: 400;
    padding: 0 .2rem;
}
.md_header .label span:before {
    content: "\2022";
    padding: 0 .5rem;
}
.wode /deep/ .markdown-text h1{
    font-size: 2em;
    margin: .67em 0;
}
.wode /deep/ .markdown-text h2{
  font-size:1.625rem;
    margin: .67em 0;
    border-bottom: 1px solid #eee;
}
.wode /deep/ .markdown-text h3{
      font-size: 1.53125rem;
          border-bottom: 1px solid #eee;
}
 .wode /deep/ .markdown-text h2,.wode /deep/ .markdown-text h3{
      margin: 30px 0 15px;
    border-bottom: 1px solid #eee;
}
.wode /deep/ .md_header .label{
  text-align: left;
  margin:.5rem 1rem; 
}
.shoucang{
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: left;
  margin: .5rem 1rem;
}
.shoucang_icon{
  font-size: 25px;
}
.shoucang_icon_h1{
  font-size: 16px;
  color: #009688;
  font-weight: 800;
  margin-left: .9125rem;
}
.renl_button{
  display: block;
  float: right;
}
.wode /deep/ .renl{
  /* width: 100%; */
  /* height: 100px; */
  margin: .5rem 1rem;
  background: pink;
}
.wode /deep/ #renl_textarea{
  display: inline-block;
  margin: .5rem 1rem;
  width:80%;
  height: 9.75rem;
}
.wode /deep/ .markdown-text h1, .wode /deep/ .markdown-text h2, .wode /deep/ .markdown-text h3, .wode /deep/ .markdown-text h4, .wode /deep/ .markdown-text h5, .wode /deep/ .markdown-text h6{
  font-weight: 700;
  text-align: left;
  margin:.5rem 1rem; 
  padding-bottom: 0;
}
.wode /deep/ .markdown-text  a{
  display: block;
  color:#ff4081;
}
.wode /deep/ .markdown-text pre {
    font-family: Monaco,Menlo,Consolas,Courier New,monospace;
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
.wode /deep/ .markdown-text blockquote p{
    padding:0 1rem;
    text-align: left;
    font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
}
.wode /deep/ .markdown-text ul li{
  text-align: left;
  padding:.15rem 1rem;
}
/*评论*/ 
.replies_li_first{
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  background-color: #f6f6f6;
  padding: 1rem;
  margin: 0;
}
.replies{
  width: 100%;
  border-top: 1px solid #f0f0f0;
}
.replies>li {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    margin: 0;
}
.reply>.msg {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-bottom: 1rem;
}

.author>img {
    width: 2rem;
    height: 2rem;
    vertical-align: top;
}
.author>.name {
    color: #666;
    font-weight: 700;
}
.author>.timer {
    color: #08c;
}
.wode /deep/ .markdown-text2>.markdown-text{
  display: block;
  /* margin-bottom:1rem; */
  text-align: left
}
.wode /deep/ .markdown-text2>.markdown-text>p{
  margin-top: 0;
  padding: 0;
}
.ups>i,.ups>span{
  color: #009688;
}
</style>
