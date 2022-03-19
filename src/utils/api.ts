import Axios from 'axios'
import {
  AddLinkRequest,
  AddLinkResponse,
  DeleteLinkRequest,
  DeleteLinkResponse,
  GetLinkRequest,
  GetLinkResponse,
  SearchLinkRequest,
  SearchLinkResponse,
  UpdateLinkRequest,
  UpdateLinkResponse,
} from '../../common/apiTypes'
export const client = Axios.create({})

export function addLink(req: AddLinkRequest) {
  return client.post<AddLinkResponse>('/api/add_link', req)
}

export function updateLink(req: UpdateLinkRequest) {
  return client.post<UpdateLinkResponse>('/api/update_link', req)
}

export function search(params: SearchLinkRequest) {
  return client.get<SearchLinkResponse>('/api/search', {
    params,
  })
}

export function getLink(params: GetLinkRequest) {
  return client.get<GetLinkResponse>('/api/get_link', { params })
}

export function deleteLink(data: DeleteLinkRequest) {
  return client.post<DeleteLinkResponse>('/api/delete_link', data)
}
