import { AddLinkResponse, AddLinkRequest } from '../../common/apiTypes'
import { ApiMiddleware } from '../types'
import { ObjectId } from 'mongodb'

const addLink: ApiMiddleware<AddLinkResponse, unknown, AddLinkRequest> = async (
  ctx
) => {
  let res: AddLinkResponse
  if (
    await ctx.db.findOne({
      name: {
        $eq: ctx.request.body.name,
      },
    })
  ) {
    res = {
      error: '链接已存在',
    }
  } else {
    const instertResponse = await ctx.db.insertOne({
      name: ctx.request.body.name,
      link: ctx.request.body.link,
      description: ctx.request.body.description,
    })
    if (instertResponse.acknowledged) {
      res = { link: ctx.request.body }
    } else {
      res = {
        error: '添加链接失败请重试',
      }
    }
  }
  ctx.body = res
}

export default addLink
