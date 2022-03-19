import { DeleteLinkResponse, DeleteLinkRequest } from '../../common/apiTypes'
import { ApiMiddleware } from '../types'
import { ObjectId } from 'mongodb'

const deleteLink: ApiMiddleware<
  DeleteLinkResponse,
  unknown,
  DeleteLinkRequest
> = async (ctx) => {
  const res = await ctx.db.deleteOne({
    name: {
      $eq: ctx.request.body.name,
    },
  })

  if (res.acknowledged) {
    ctx.body = { error: '链接不存在' }
  } else {
    ctx.body = {}
  }
}

export default deleteLink
