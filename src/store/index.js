import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate"
import commonStore from "./commonStore.js"

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Wise Wrong'
  },
  mutations:{
    newAuthor(state,msg){
        state.author=msg
    }
  },
  modules:{
    commonStore
  },
  plugins: [createPersistedState()]
})

export default store