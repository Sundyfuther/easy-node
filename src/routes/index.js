import Router from 'koa-router'

const router = new Router()
// default route
router.get('/', async (ctx, next) => {
  const title = 'Koa2 Sever'
  const content = '千万里阳光号'

  await ctx.render('index', {
    title,
    content
  })
})

export default router