<template>
    <div class="wrapper">
        <button class="title" title="发布话题">我是头部</button>
        <main>
            <textarea v-model="content" class="text content" hintText="输入文本，支持markdown格式"rows="5" :underlineShow="false" />
            <button @click="setData" label="发布话题" class="demo-raised-button" icon="near_me" >发表</button>
        </main>
    <p>半成品，可发送死数据，输入框可进行markdown编写，在首页的tab里分享里查看</p>

    </div>
</template>
<script>
import marked from 'marked'
export default {
    components: {
        // BottomNavigation
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            accesstoken: '',
            list: 0,
            lists: ['分享', '问答', '招聘'],
            title: '',
            tab: '',
            content: '',
            publish: false,
            tips: '请输入正确格式'
        }
    },
    created() {
        this.accesstoken = localStorage.getItem("accesstoken")
    },
    methods: {
        setData() {
            if (this.list === 0) {
                this.tab = 'share'
            } else if (this.list === 1) {
                this.tab = 'ask'
            } else if (this.list === 2) {
                this.tab = 'job'
            }
            let that = this
            that.content = marked(that.content)
                // console.log(that.accesstoken)
                // console.log(that.title)
                // console.log(that.tab)
                // console.log(that.content)
             this.$http.post('https://www.vue-js.com/api/v1/topics', {
                    accesstoken: that.accesstoken,
                    title: 'sssss',
                    tab: 'share',
                    content: that.content
                })
                .then(function(response) {
                    // console.log(response.data)
                    that.title = ''
                    that.content = ''
                    that.tips = '发表成功！'
                    that.publish = true
                    setTimeout(function() {
                        that.publish = false
                    }, 1500)
                })
                .catch(function(error) {
                    that.publish = true
                })
        },
        close() {
            this.publish = false
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}
.title {
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    display: -webkit-box;
    display: -ms-flexbox;
    text-align: center;
    font-size: 1.125rem;
    background: #009688;
    color: #fff;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
main {
    margin: 5rem 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
.text {
    /*font-size: 24px;*/
    width: 100%;
    /*text-align: center;*/
}
.content {
    /* flex: 1; */
    background-color: #f7f7f7;
    /* padding: 1rem; */
    overflow-y: auto;
}
textarea {
    height: 10rem;
}
.demo-raised-button{
    padding: .4rem 3rem;
    border-radius: 2rem;
    margin: 0 auto;
    margin-top: 4rem;
}
</style>