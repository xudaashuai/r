import { UI_DOMAIN } from '../common/constant'
import Koa from 'koa'

export function redirector(): Koa.Middleware<
  Koa.DefaultState,
  Koa.DefaultContext
> {
  return async (ctx) => {
    const name = ctx.request.path.substring(1)

    const res = await ctx.db.findOne({
      _id: name,
    })

    console.log(res, name)
    ctx.status = 302
    if (res) {
      ctx.redirect(res.link)
    } else {
      ctx.redirect(`http://${UI_DOMAIN}/add?name=${name}`)
    }
  }
}
