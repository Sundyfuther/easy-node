import fs from 'fs'
import http from 'http'
import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import cors from 'koa2-cors'
import config from './config'
import koaBody from 'koa-body'
import router from './routes'

const app = new Koa()

// middlewares
app.use(convert(koaBody({multipart: true})))
app.use(convert(json()))
app.use(convert(logger()))

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
})))

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// cors
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return '*'
    }
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 500 error
koaOnError(app, {
  template: 'views/500.ejs'
})

const directory = fs.readdirSync(path.join(__dirname, './modules'))
for (var i = 0; i < directory.length; i++) {
  if (fs.existsSync(`${path.join(__dirname, './modules')}/${directory[i]}/routes`)) {
    // console.log(directory[i], '>>>>>>>>', require(`./modules/${directory[i]}/routes`))
    router.use('', require(`./modules/${directory[i]}/routes`).routes())
  }
}

const uniquePath = () => {
  const a = router.stack.map(item => {
    return item.path
  })
  const c = []

  for (let i = 0; i < a.length; i++) {
    if (a[i] === undefined) {
      continue
    }

    if (!c.includes(a[i])) {
      c.push(a[i])
    } else {
      const e = new Error()
      e.message = `path '${a[i]}' already existed, if you don\`t find same path in your code, try to use 'npm run clean' in terminal`
      throw e
    }
  }
}

uniquePath()

// response router
app.use(async (ctx, next) => {
  await router.routes()(ctx, next)
})

// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = parseInt(config.port || process.env.PORT)
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app
