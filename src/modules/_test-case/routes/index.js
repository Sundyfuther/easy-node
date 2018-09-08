import Router from 'koa-router'
import testCaseController from '../controller'

const router = new Router()

/**
 * 调试/测试专用接口
 */
router.get('/case/testCase1.node', testCaseController._testCase1)
router.get('/case/testCase2.node', testCaseController._testCase2)
router.get('/case/testCase3.node', testCaseController._testCase3)

export default router
