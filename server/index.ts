import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import Logger from 'koa-logger'
import json from 'koa-json'
import koaqs from 'koa-qs'
import { MongoClient } from 'mongodb'
import { RedirectLink } from '../common/model'
import { RedirectorContext } from './types'
import { redirector } from './redirector'
import addLink from './router/addLink'
import search from './router/search'
import getLink from './router/getLink'
import deleteLink from './router/deleteLink'
import updateLink from './router/updateLink'

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'

async function start() {
  const db = (await MongoClient.connect(DB_URL))
    .db('r')
    .collection<RedirectLink>('link')
  console.log('数据库已连接')

  const app = new Koa<Koa.DefaultState, RedirectorContext>()
  app.context.db = db
  app.use(Logger())
  app.use(redirector())

  app.listen(8080, () => {
    console.log('backend at port 8080')
  })
}

async function start2() {
  const db = (await MongoClient.connect(DB_URL))
    .db('r')
    .collection<RedirectLink>('link')
  console.log('数据库已连接!')

  const app = new Koa<Koa.DefaultState, RedirectorContext>()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  koaqs(app, 'extended')
  app.context.db = db
  app.use(bodyParser())
  app.use(Logger())
  app.use(json())
  app.use(async (ctx, next) => {
    console.log(
      `[request start] path: ${ctx.path} method: ${
        ctx.method
      } query: ${JSON.stringify(ctx.query)} body: ${ctx.request.rawBody}`
    )
    await next()
    console.log(
      `[request end] path: ${ctx.path} method: ${ctx.method} status: ${
        ctx.status
      } response: ${JSON.stringify(ctx.response.body)}`
    )
  })

  const router = new Router<Koa.DefaultState, RedirectorContext>()
  router.get('/get_link', getLink)
  router.post('/add_link', addLink)
  router.post('/delete_link', deleteLink)
  router.post('/update_link', updateLink)

  router.get('/search', search)

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(8000, () => {
    console.log('backend at port 8000')
  })
}

start()
start2()
