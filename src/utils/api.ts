import Axios from 'axios'

export const client = Axios.create({})

export function addNewLink({
  name,
  description,
  link,
}: {
  name: string
  description: string
  link: string
}) {
  return client.post<{
    error?: string
    acknowledged: boolean
  }>('/api/addLink', {
    name,
    description,
    link,
  })
}
