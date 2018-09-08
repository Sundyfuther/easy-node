import fetch from 'node-fetch'
import caseService from '../service'
import caseMockData from '../mock/caseMockData'

class caseController {
  /**
   * [mockCase 请求假数据_case]
   */
  static mockCase (ctx, next) {
    // console.log('ctx::::',ctx); // ⚠️ 请求 node service 的客户端信息包含在该对象中
    // console.log('request hostname:::',ctx.request.header.host); //  ⚠️ 客户端的域名
    // console.log('request header:::',ctx.header); //  ⚠️ 客户端请求的 header 参数
    // console.log('request json:::',ctx.request.body); //  ⚠️ 客户端 POST 请求的 JSON 参数
    // console.log('request form-data:::',ctx.request.body.fields); //  ⚠️ 客户端 POST 请求的 form-data 参数
    // console.log('request params:::',ctx.query); //  ⚠️ 客户端 GET 请求的参数
    ctx.response.body = caseMockData // Node middle service Response
  }

  /**
   * [interfaceMergeCase 同时请求 2 个及以上接口，合并数据暴露为一个接口]
   */
  static async interfaceMergeCase (ctx, next) {
    const URL_1 = 'https://xxx.url-1'
    const URL_2 = 'https://xxx.url-2'
    const TYPE = 'GET'

    const myDataRequest = fetch(URL_1, {
      method: TYPE
    })
    .then(res => {
      let resJ = res.json()

      if (res.ok) {
        return resJ
      }
    })
    .catch((e) => {
      console.log('error:', e)
    })

    const myMergeDataRequest = fetch(URL_2, {
      method: TYPE
    })
    .then(res => {
      let resJ = res.json()
      if (res.ok) {
        return resJ
      }
    })
    .catch((e) => {
      console.log('error:', e)
    })

    ctx.response.type = 'application/json'
    ctx.response.set({
      'Access-Control-Allow-Headers': 'accept, token',
      'Access-Control-Expose-headers': 'accept, token'
    })

    const dataPartOne = await myDataRequest
    const dataPartTwo = await myMergeDataRequest

    ctx.response.body = caseService.interfaceMergeCase({dataPartOne, dataPartTwo}) // Node middle service Response
  }
  /**
   * [postCase post请求示例]
   */
  static async postCase (ctx, next) {
    const URL = 'https://xxx.url'
    const TYPE = 'POST'
    const params = {
      'token': ctx.request.body.token,
      'id': ctx.request.body.id,
      'data': ctx.request.body.data
    }

    const postDataRequest = await fetch(URL, {
      method: TYPE,
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      let resJ = res.json()

      if (res.ok) {
        return resJ
      }
    })
    .then(data => {
      return caseService.postCase(data)
    })
    .catch((e) => {
      console.log('error:', e)
    })

    ctx.response.type = 'application/json'
    ctx.response.set({
      'Access-Control-Allow-Headers': 'accept, token, zoneCode',
      'Access-Control-Expose-headers': 'accept, token, zoneCode'
    })
    ctx.response.body = postDataRequest // Node middle service Response
  }
  /**
   * [getCase get请求示例]
   */
  static async getCase (ctx, next) {
    const URL = 'https://xxx.url'
    const TYPE = 'GET'
    const getDataRequest = await fetch(URL, {
      method: TYPE
    })
    .then(res => {
      let resJ = res.json()

      if (res.ok) {
        return resJ
      }
    })
    .then(data => {
      return data
    })
    .catch((e) => {
      console.log('error:', e)
    })

    ctx.response.type = 'application/json'
    ctx.response.set({
      'Access-Control-Allow-Headers': 'accept, token',
      'Access-Control-Expose-headers': 'accept, token'
    })
    ctx.response.body = getDataRequest // Node middle service Response
  }
  /**
   * [outSideApiCase 第三方API请求示例]
   * 暂不通，可忽略
   */
  static async outSideApiCase (ctx, next) {
    const URL = 'http://ip.taobao.com/service/getIpInfo.php?ip=63.223.108.42'
    const TYPE = 'GET'
    let resData = null

    await fetch(URL, {
      method: TYPE
    })
    .then(res => {
      let resJ = res.json()

      if (res.ok) {
        return resJ
      }
    })
    .then(data => {
      resData = data
    })
    .catch((e) => {
      console.log('error:', e)
    })

    ctx.response.type = 'application/json'
    ctx.response.set({
      'Access-Control-Allow-Headers': 'accept, token',
      'Access-Control-Expose-headers': 'accept, token'
    })
    ctx.response.body = resData // Node middle service Response
  }
}

export default caseController
