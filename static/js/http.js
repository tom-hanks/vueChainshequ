import axios from 'axios' // 引入axios
import * as hostUrl from './env.js'
import Vant from 'vant';
// import loading from '../../plugin/loading'

function apiAxios(method, url, params, needToken, header, errorCallback, successAlertMsg) {
  let rootUrl = hostUrl.publicApi
  let config = {
    method: method,
    url: url,
    headers: mergeHeader(needToken, header),
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: url.includes('http://192.168.9.173:8871')?'':rootUrl
  }
  // loading(true)

  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => { // then 请求成功之后进行什么操作
        if (res.data) {
          if (successAlertMsg) {
            Toast.success(successAlertMsg || '更新成功')
          }
          resolve(res)
        } else {
          // 更新失败后的错误提示信息
          let parm = ''
          if (res.data.errors && res.data.errors.length) {
            parm = res.data.errors && res.data.errors.length ? res.data.errors.toString() : ''
          } else if (res.data.error && res.data.error.length) {
            parm = res.data.error && res.data.error.length ? res.data.error.toString() : ''
          } else {
            parm = res.data.msg && res.data.msg.length ? res.data.msg.toString() : ''
          }
          if (parm.length > 0) {
            Toast.fail(res.data.message || parm)
          }
          // reject(res)
        }
  // loading(false)
      })
      .catch(error => {
  // loading(false)

        console.log('请求异常信息：' + error)
        // reject(error)
      })
  })
}

function mergeHeader(needToken, headers) {
  let h = {
    'Content-Type': 'application/json'
  }
  if (needToken) {
    h['token'] = sessionStorage.access_Token || ''
  }
  if (headers) {
    for (let k in headers) {
      if (headers.hasOwnProperty(k)) {
        h[k] = headers[k]
      }
    }
  }
  return h
}

// 返回在vue模板中的调用接口 needToken--请求时header是否需要添加token
/**
 * url--传入接口地址、
 * params--传入参数、
 * needToken--是否需要Authorization 头信息、
 * headers--添加新的头信息、
 * showLoadBooler--判断这个接口是否需要loading如聊天界面发消息时候就不需要
 * errorCallback -- 错误需要回调的函数
 * */
export default {
  Get: function (parm) {
    let controller = parm.controller || {}
    return apiAxios('GET', parm.url, parm.data, controller.needToken || true, controller.headers, controller.errorCallback, controller.successAlertMsg)
  },
  Post: function (parm) {
    let controller = parm.controller || {}
    return apiAxios('POST', parm.url, parm.data, controller.needToken || true, controller.headers, controller.errorCallback, controller.successAlertMsg)
  },
  Put: function (parm) {
    let controller = parm.controller || {}
    return apiAxios('PUT', parm.url, parm.data, controller.needToken || true, controller.headers, controller.errorCallback, controller.successAlertMsg)
  },
  Delete: function (parm) {
    let controller = parm.controller || {}
    return apiAxios('DELETE', parm.url, parm.data, controller.needToken || true, controller.headers, controller.errorCallback, controller.successAlertMsg)
  }
}
