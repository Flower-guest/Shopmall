import {
  request
} from './request'

export function getTitle() {
  return request({
    url: '/category',
  })
}
