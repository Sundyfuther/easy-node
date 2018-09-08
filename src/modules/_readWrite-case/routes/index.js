import Router from 'koa-router'
import readWriteController from '../controller'

const router = new Router()

/**
 * 文件 创建／读写／删除 示例
 */
router.get('/case/readWrite/writeStream.node', readWriteController.writeStream)
router.get('/case/readWrite/readStream.node', readWriteController.readStream)
router.get('/case/readWrite/deleteFile.node', readWriteController.deleteFile)

export default router
