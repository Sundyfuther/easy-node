import Router from 'koa-router'
import caseController from '../controller'

const router = new Router()

/**
 * [mockCase 请求假数据_case]
 */
router.get('/case/mockCase.node', caseController.mockCase)
/**
 * [interfaceMergeCase 同时请求 2 个及以上接口，合并数据暴露为一个接口]
 */
router.get('/case/interfaceMergeCase.node', caseController.interfaceMergeCase)
/**
 * [postCase post请求示例]
 */
router.post('/case/postCase.node', caseController.postCase)
/**
 * [getCase get请求示例]
 */
router.get('/case/getCase.node', caseController.getCase)
/**
 * [outSideApiCase 第三方API请求示例]
 * 暂不通，可忽略
 */
router.get('/case/outSideApiCase.node', caseController.outSideApiCase)

export default router
