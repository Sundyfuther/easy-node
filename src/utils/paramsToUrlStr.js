/**
 * [paramsToUrlStr 对象转换 get 请求参数 ]
 * @param  {[Object]} params [请求参数]
 * @return {[String]}        [返回 ?key=value&key=value 格式字符串]
 */
const paramsToUrlStr = (params) => {
  if (!/^{.*}$/.test(JSON.stringify(params))) { console.error('params for function "paramsToUrlStr" not Object') }
  const keysName = params && Object.keys(params) || []
  let str = '?'

  for (let i = 0, len = keysName.length; i < len; i++) {
    let s = `${keysName[i]}=${params[keysName[i]]}&`
    str += s
  }
  str = str.slice(0, -1)
  return str
}

export default paramsToUrlStr
