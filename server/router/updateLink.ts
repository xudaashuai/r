import { omit } from 'lodash'
import { UpdateLinkResponse, UpdateLinkRequest } from '../../common/apiTypes'
import { ApiMiddleware } from '../types'

const updateLink: ApiMiddleware<
  UpdateLinkResponse,
  unknown,
  UpdateLinkRequest
> = async (ctx) => {
  if (
    await ctx.db.findOne({
      name: {
        $eq: ctx.request.body.name,
      },
    })
  ) {
    console.log(omit(ctx.request.body, ['_id']))
    const res = await ctx.db.updateOne(
      {
        name: {
          $eq: ctx.request.body.name,
        },
      },
      {
        $set: omit(ctx.request.body, ['_id']),
      }
    )

    if (res.acknowledged) {
      ctx.body = { link: ctx.request.body }
      return
    }
    ctx.body = {
      error: '修改链接失败请重试',
    }
    return
  }
  ctx.body = {
    error: '链接不存在',
  }
  return
}

export default updateLink
