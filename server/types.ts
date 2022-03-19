import { RedirectLink } from 'common/model'
import Application from 'koa'
import Koa from 'koa'
import { IRouterParamContext } from 'koa-router'
import { Collection } from 'mongodb'

export interface RedirectorContext {
  db: Collection<RedirectLink>
}
export type RedirectorState = Koa.DefaultState

export type RedirectorMiddleware = Application.Middleware<
  Application.DefaultState,
  RedirectorContext
>

export type Context = Koa.ParameterizedContext<
  Koa.DefaultState,
  RedirectorContext
>

export type ApiMiddleware<ResponseBodyT, RequestParamsT, RequestBodyT> =
  Koa.Middleware<
    Koa.DefaultState,
    RedirectorContext &
      IRouterParamContext<Koa.DefaultState, RedirectorContext> & {
        request: {
          body: RequestBodyT
        }
        query: RequestParamsT
      },
    ResponseBodyT
  >
