import axios from 'axios'

export function getClassify () {
  const url = '/api/getClassify'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getClassifyList (id) {
  const url = '/api/getClassifyList'

  const data = {
    cid: id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getClassifyMenu (id) {
  const url = '/api/getClassifyMenu'

  const data = {
    order: 2,
    cid: id,
    pagesize: 4
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
