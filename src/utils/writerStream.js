import fs from 'fs'
import path from 'path'
import mkdir from './mkdir'

/**
 * [writerStream 创建文件/写入文件流]
 * @param  {[string]} writePath [写入对象的绝对路径]
 * @param  {[string]} data [写入的内容]
 */
const writerStream = (writePath, data) => {
  let directory = path.dirname(writePath)
  let writerStream

  // 若路径不存在，则创建路径
  !fs.existsSync(directory) && mkdir(directory)

  // 创建一个可以写入的流，写入到文件中
  writerStream = fs.createWriteStream(writePath)

  // 使用 utf8 编码写入数据
  writerStream.write(data, 'UTF8')

  // 标记文件末尾
  writerStream.end()

  // 处理流事件 --> data, end, and error
  writerStream.on('finish', function () {
    console.log('写入完成。')
  })

  writerStream.on('error', function (err) {
    console.log(err.stack)
  })

  console.log('程序执行完毕')
}

export default writerStream
