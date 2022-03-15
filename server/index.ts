import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import Logger from 'koa-logger'
import json from 'koa-json'
import { MongoClient } from 'mongodb'
import { REDIRECTOR_DOMAIN, UI_DOMAIN } from '../common/constant'

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'

async function start() {
  const db = (await MongoClient.connect(DB_URL)).db('r').collection('link')
  console.log('数据库已连接')

  const app = new Koa()
  app.use(new Logger())
  app.use(async (ctx) => {
    const name = ctx.request.path.substring(1)

    const res = await db.findOne({
      _id: name,
    })
    console.log(res, name)
    ctx.status = 302
    if (res) {
      ctx.redirect(res.link)
    } else {
      ctx.redirect(`http://${UI_DOMAIN}/add?name=${name}`)
    }
  })

  app.listen(8080, () => {
    console.log('backend at port 8080')
  })
}

async function start2() {
  const db = (await MongoClient.connect(DB_URL)).db('r').collection('link')
  console.log('数据库已创建!')

  const app = new Koa()
  app.use(bodyParser())
  app.use(new Logger())
  app.use(json())
  const router = new Router()
  let res

  router.post('/addLink', async (ctx) => {
    console.log(ctx.request.body)
    if (
      await db.findOne({
        _id: ctx.request.body.name,
      })
    ) {
      if (ctx.request.body.edit) {
        res = await db.updateOne(
          {
            _id: ctx.request.body.name,
          },
          {
            $set: {
              ...ctx.request.body,
            },
          }
        )
      } else {
        res = {
          acknowledged: false,
          error: '已存在',
        }
        return
      }
    } else {
      res = await db.insertOne({
        ...ctx.request.body,
        _id: ctx.request.body.name,
      })
    }
    ctx.body = res
  })
  router.post('/search', async (ctx) => {
    console.log(ctx.request.body)
    const cur = db.find(
      {
        _id: {
          $regex: ctx.request.body.keyword,
        },
      },
      {
        limit: 10,
      }
    )

    const res = []

    await cur.forEach((item) => {
      res.push(item)
    })
    console.log(res)
    ctx.body = res
  })

  router.post('/getLink', async (ctx) => {
    console.log(ctx.request.body)

    const res = await db.findOne({
      _id: {
        $eq: ctx.request.body.name,
      },
    })

    console.log(res)
    ctx.body = res
  })

  router.post('/deleteLink', async (ctx) => {
    console.log(ctx.request.body)

    const res = await db.deleteOne({
      _id: {
        $eq: ctx.request.body.name,
      },
    })

    console.log(res)
    ctx.body = res
  })

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(8000, () => {
    console.log('backend at port 8000')
  })
}

start()
start2()
