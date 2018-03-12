// import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
import axios from 'axios'

export function getBanner () {
  const url = '/api/getBanner'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getIndex () {
  const url = '/api/getIndex'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
