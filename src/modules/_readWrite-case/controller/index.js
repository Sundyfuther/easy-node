import fs from 'fs'
import path from 'path'
import readerStream from '../../../utils/readerStream.js'
import writerStream from '../../../utils/writerStream.js'
import deleteFiles from '../../../utils/deleteFiles.js'

const _path1 = path.join(__dirname, '../outputFiles/test.json')
const writeData = {
  app: 'node.js',
  len: 'javascript',
  content: '您还未写入任何内容,为您展示默认内容'
}

class readWriteController {
  /**
   * [writeStream 写入/创建文件]
   */
  static async writeStream (ctx, next) {
    let _data
    if (ctx.query.writeData) {
      _data = {
        ...writeData,
        content: ctx.query.writeData
      }
    } else {
      _data = writeData
    }
    writerStream(_path1, JSON.stringify(_data))

    ctx.response.body = {
      'response': '执行写入',
      'writeData': ctx.query.writeData || '您还未写入任何信息,请通过 url param writeData 属性上传您要写入的字符'
    }
  }
  /**
   * [readStream 读取文件]
   */
  static readStream (ctx, next) {
    // 异步读取流方式
    readerStream(_path1, data => {
      console.log(`读取到文件:::::${data}`)
      data = data && JSON.parse(data)
    })
    // 同步读取文件
    const data = fs.existsSync(_path1) && fs.readFileSync(_path1)
    const _data = data && JSON.parse(data.toString()) || {'response': '文件不存在'}

    ctx.response.body = _data
  }
  /**
   * [deleteFile 删除文件]
   */
  static deleteFile (ctx, next) {
    deleteFiles(_path1)

    ctx.response.body = {
      'response': '执行删除'
    }
  }

}

export default readWriteController
