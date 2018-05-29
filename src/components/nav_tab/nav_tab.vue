<template>
  <div class="hello">
    <!-- <h2>我是切换导航组件</h2> -->
      <ul class="nav_tab" v-bind:class="message">
        <li v-for="(item,index) in tabs" v-bind:class="{cur:selected===index}" v-on:click="changeTab(index)">{{item.tab}}</li>
      </ul>
      <div class="contentFu">
          <div  class="mu-list">
             <scroller 
                      :on-refresh="refresh"
                      :on-infinite="infinite">
                      <section  class="list" v-for="(item,idnex) in ajaxdata">
                          <img  class="" v-bind:src="item.author.avatar_url"  alt="user"><!-- v-bind:src="item.author.avatar_url" -->
                          <div  class="content">
                              <div  class="list_title"><span >置顶</span> 
                                   <h3 >{{item.title}}</h3>
                              </div>
                              <div  class="timer"><span >179 / 117440</span>  <span >2天前</span>
                              </div>
                          </div>
                      </section>
              </scroller>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props : ['message'],
    data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:0,
      tabs:[{
        tab:'全部',
        tabContent:'全部11111111111111'
      },{
        tab:'精华',
        tabContent:'精华11111111111111'
      },{
        tab:'weex',
        tabContent:'weex11111111111111'
      },{
        tab:'分享',
        tabContent:'分享11111111111111'
      },{
        tab:'问答',
        tabContent:'问答11111111111111'
      },{
        tab:'招聘',
        tabContent:'招聘11111111111111'
      }],
      ajaxdata:[],
      down_data_num:1,
      items: []
    }
  },
  created() {//在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
            
        },
 mounted(){
          this.ajaxHomeList(1,1);
          console.log('默认加载');
  },
  methods: { 
   refresh (done) {
        setTimeout(() => {
          this.ajaxHomeList(1,1,done)
          // done();
        }, 1000);
          console.log('顶部');
          console.log(this.ajaxdata)         
          
        
      },
      infinite (done) {
        setTimeout(() => {
          this.down_data_num+=1;
          this.ajaxHomeList(this.down_data_num,2,done);
          // console.log(this.ajaxdata);
          // done()
        }, 1000);
        console.log('底部')
      }, 
     changeTab(index){
       this.selected=index;
     },
      ajaxHomeList(a,b,c){
       this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page:a}})
                .then((response) =>{
                  if(b==1){
                      this.ajaxdata=[];
                      this.ajaxdata=this.ajaxdata.concat(response.data.data);
                      console.log(this.ajaxdata);
                  }else{
                      this.ajaxdata=this.ajaxdata.concat(response.data.data)
                      console.log(this.ajaxdata);
                      // console.log('到底部')
                  }
                  c();
                })
              .catch(function (error) {
                console.log(error);
              });
     }
  } 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.header_style0{
  background: #7e57c2;
  color:#fff;
}
.header_style1{
    background-color: #474a4f;
    color: #ffffff;
}
.header_style2{
  background-color: #009688;
  color: #ffffff;
}
ul.nav_tab{
    display: flex;
  -webkit-box-pack: justify;
}
li {
  height: 1.5rem;
  line-height: 1.5rem;
  width: 100%;
  display: inline-block;
}
li.cur{
  color:#fff;
  border-bottom:2px solid red;
}
a {
  color: #42b983;
}
.mu-list {
    height: 600px;
    padding: 8px 0;
    width: 100%;
    position: relative;
    overflow-y: scroll;
    /* overflow-x: hidden;
    overflow-y: visible; */
}
.list_title{
    position: relative;
    padding-left: 35px;
    min-height: 2.5rem;
}
.list{
  width: 414px;
  height: 81px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #999;
    padding: .5rem;
}
.list>img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 1rem;
}
/* .content {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
} */
.list_title>span {
    background-color: #009688;
    color: #fff;
    padding: .2rem;
    border-radius: .2rem;
    position: absolute;
    left: 0;
}

.list_title>h3 {
    display: block;
    width: 16rem;
    font-weight: 700;
    text-align: left;
}
.timer{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #999;
}
.nomore{
    text-align: center;
    padding: 1rem 0;
}
.scroller {
  position: relative;
}
</style>
