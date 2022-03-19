import { ObjectId } from 'mongodb'
import { GetLinkResponse, GetLinkRequest } from '../../common/apiTypes'
import { ApiMiddleware } from '../types'

const getLink: ApiMiddleware<GetLinkResponse, GetLinkRequest, unknown> = async (
  ctx
) => {
  const res = await ctx.db.findOne({
    name: {
      $eq: ctx.query.name,
    },
  })

  if (res) {
    ctx.body = {
      link: res,
    }
  } else {
    ctx.body = { error: '链接不存在' }
  }
}

export default getLink
