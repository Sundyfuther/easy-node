import fs from 'fs'

/**
 * [readerStream 读取文件流]
 * @param  {[string]} readPath [读取对象的绝对路径]
 * @param  {[fuc]} callback [根据回调获取读取结果]
 */
const readerStream = (readPath, callback) => {
  let data = ''
  if (!fs.existsSync(readPath)) {
    callback && typeof callback === 'function' && callback(data)
    console.log('path is not exists!')
    return
  }
// 创建可读流
  let readerStream = fs.createReadStream(readPath)

// 设置编码为 utf8。
  readerStream.setEncoding('UTF8')

// 处理流事件 --> data, end, and error
  readerStream.on('data', function (chunk) {
    data += chunk
  })
  readerStream.on('end', function () {
    callback && typeof callback === 'function' && callback(data)
  })

  readerStream.on('error', function (err) {
    callback && typeof callback === 'function' && callback(err)
    console.log(err.stack)
  })

  console.log('程序执行完毕')
}

export default readerStream
