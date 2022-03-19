import { RedirectLink } from './model'

// AddLink
export type AddLinkResponse =
  | {
      error: '链接已存在' | '添加链接失败请重试'
      link?: undefined
    }
  | {
      error?: undefined
      link: RedirectLink
    }

export type AddLinkRequest = {
  name: string
  link: string
  description?: string
}

// AddLink
export type UpdateLinkResponse =
  | {
      error: '链接不存在' | '修改链接失败请重试'
      link?: undefined
    }
  | {
      error?: undefined
      link: RedirectLink
    }

export type UpdateLinkRequest = {
  name: string
  link: string
  description?: string
}

// GetLink
export type GetLinkResponse =
  | {
      error: '链接不存在'
      link?: undefined
    }
  | {
      error?: undefined
      link: RedirectLink
    }

export type GetLinkRequest = {
  name: string
}

// search link
export type SearchLinkResponse = {
  links: RedirectLink[]
}

export type SearchLinkRequest = {
  name: string
}

// GetLink
export type DeleteLinkResponse = {
  error?: '链接不存在'
}

export type DeleteLinkRequest = {
  name: string
}
