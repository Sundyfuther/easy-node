import fs from 'fs'
import path from 'path'

/**
 * [mkdir 根据路径创建文件夹]
 * @param  {[string]} dirpath [需创建文件夹的绝对路径]
 * @param  {[undefined]} dirname [用户调用该方法时，可忽略该参数]
 */
// 使用时第二个参数可以忽略
const mkdir = (dirpath, dirname) => {
  // 判断是否是第一次调用
  if (typeof dirname === 'undefined') {
    if (fs.existsSync(dirpath)) {
      return
    } else {
      mkdir(dirpath, path.dirname(dirpath))
    }
  } else {
    // 判断第二个参数是否正常，避免调用时传入错误参数
    if (dirname !== path.dirname(dirpath)) {
      mkdir(dirpath)
      return
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath)
    } else {
      mkdir(dirname, path.dirname(dirname))
      fs.mkdirSync(dirpath)
    }
  }
}

export default mkdir
