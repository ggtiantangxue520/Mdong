import axios from 'axios'

export function getHotsearch () {
  const url = '/api/getHotsearch'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSearch (type, query) {
  const url = '/api/getSearch'

  const data = {
    type,
    s: query,
    p: 1,
    pagesize: 10
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
