import { RedirectLink } from 'common/model'
import { ApiMiddleware } from 'server/types'
import { SearchLinkRequest, SearchLinkResponse } from 'common/apiTypes'

const search: ApiMiddleware<
  SearchLinkResponse,
  SearchLinkRequest,
  unknown
> = async (ctx) => {
  const cur = ctx.db.find<RedirectLink>(
    {
      name: {
        $regex: ctx.query.name,
      },
    },
    {
      limit: 10,
    }
  )

  const links: RedirectLink[] = []

  await cur.forEach((item) => {
    links.push(item)
  })
  ctx.body = { links }
}

export default search
