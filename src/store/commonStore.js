import Vant from 'vant';
import requestApi from '../../static/js/http'

export default {
  state: {
    page: {
      // 分页数
      arrPageSize: [15, 20, 30, 40],
      // 分页大小
      pageSize: 15,
      // 总分页数
      pageCount: 1,
      // 当前页面
      pageCurrent: 1,
      // 总数
      totalCount: 1
    },
    isLoading: true,
    resetStatus: false,
    tableLoading: true,
    tableAjaxData: [],
    tableData: [],
    allDepartment: [],
    allDepartmentList: [],
    allStore: [],
    registerSourceList: [],
    stringDepartment: '',
    departmentChild: [],
    serviceTypesList: [], //服务类型字典
    normalDataList: [],
    updateNormalData: false,
    hasLogin: false,
    loginStatus: false,
    bread: [], //导航栏路径
    // prescriptionState:[],//已开处方状态
    oneStepList: [],
    twoStepList: [],
    threeStepList: [],
    loginData: {}
  },
  mutations: {

    handleTableData(state) {
      //3.0
      state.page.totalCount = state.tableAjaxData.total
      state.tableData = state.tableAjaxData.list
    },
    loadLogin(state) {
      let accessToken = state.loginData.userInfo.token
      sessionStorage.setItem('access_Token', accessToken)
      sessionStorage.setItem('userName', state.loginData.userInfo.name)
      sessionStorage.setItem('mobilePhone', state.loginData.userInfo.mobile)
      sessionStorage.setItem('userCode', state.loginData.userInfo.code)
      state.loginStatus = true
    },

    connectLogin(state, login) {
      state.hasLogin = login
    },
    breadHeaderList(state, arr) {
      state.bread = [...arr]
      console.log(state.bread, 123);
    },
    changePageList(state, index) {
      let _start = (index - 1) * state.page.pageSize
      let _end = index * state.page.pageSize
      state.tableData = state.tableAjaxData.slice(_start, _end)
    },
    changePageSize(state, size) {
      state.page.pageSize = size
      this.commit('handleTableData')
    },
    resetPage(state) {

      // 初始化table表格和分页
      state.tableData = []
      state.page = {
        arrPageSize: [15, 30, 50, 100],
        pageSize: 15,
        pageCount: 1,
        pageCurrent: 1,
        totalCount: 1
      }
      state.tableLoading = true
    },

    setPageSize(state) {
      state.page.pageSize = 5
      state.page.arrPageSize = [5, 20, 30, 40]
    },

    resetNormalDataList(state) {
      state.normalDataList = [];
    }
  },
  actions: {
 
    // get 普通格式的数据请求
    async getOneStep({
      commit,
      state
    }, param) {
      state.isLoading = true // loading
      let res = await requestApi.Get(param)
      state.isLoading = false // loading
      state.oneStepList = res.data.list || res.data.data
      return res.data.data
    },
    // get 普通格式的数据请求
    async getTwoStep({
      commit,
      state
    }, param) {
      state.isLoading = true // loading
      let res = await requestApi.Get(param)
      state.isLoading = false // loading
      state.twoStepList = res.data
      return res.data.data
    },
    // get 普通格式的数据请求
    async getThreeStep({
      commit,
      state
    }, param) {
      state.isLoading = true // loading
      let res = await requestApi.Get(param)
      state.isLoading = false // loading
      state.threeStepList = res.data
      return res.data.data
    },
    // 登录界面的数据请求
    async askLogin({
      commit,
      state
    }, param) {
      state.loginStatus = false // loading
      let res = await requestApi.Post(param)
      state.loginData = res.data.data
      commit('loadLogin')
      return res.data.data
    },

    // get 普通格式的数据请求
    async askTableList({
      commit,
      state
    }, param) {
      state.tableLoading = true // loading
      let res = await requestApi.Get(param)
      state.tableLoading = false // loading
      state.tableAjaxData = res.data
      commit('handleTableData')
      return res.data.data
    },
    // get 普通格式的数据请求
    async getNormalDataList({
      commit,
      state
    }, param) {
      state.isLoading = true // loading
      let res = await requestApi.Get(param)
      state.isLoading = false // loading
      state.normalDataList = res.data.data || res.data.list
      return res.data.data || res.data.list
    },
    async authentication({commit,
      state}, param){
        state.isLoading = true // loading
        let res = await requestApi.Get(param)
        state.isLoading = false // loading
        return res.data.data
      },
    // post 普通格式的数据更新请求
    async updateANormalData({
      commit,
      state
    }, param) {
      state.updateNormalData = false
      state.isLoading = true // loading
      let res = await requestApi.Post(param)
      state.updateNormalData = false
      state.isLoading = false // loading
      return res.data.data
    }
  }

}
