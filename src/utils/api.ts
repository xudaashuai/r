import Axios from 'axios'

export const client = Axios.create({})

export function addNewLink({
  name,
  description,
  link,
  edit,
}: {
  name: string
  description: string
  link: string
  edit: boolean
}) {
  return client.post<{
    error?: string
    acknowledged: boolean
  }>('/api/addLink', {
    name,
    description,
    link,
    edit,
  })
}

export function search({ keyword }: { keyword: string }) {
  return client.post<[]>('/api/search', {
    keyword,
  })
}

export function getLink(name: string) {
  return client.post<[]>('/api/getLink', {
    name,
  })
}
export function deleteLink(name: string) {
  return client.post<[]>('/api/deleteLink', {
    name,
  })
}
