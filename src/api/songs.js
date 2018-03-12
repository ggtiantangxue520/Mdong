import axios from 'axios'

export function getSongs (tid) {
  const url = '/api/getSongs'

  const data = {
    order: 0,
    tid
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getType () {
  const url = '/api/getType'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getList (id) {
  const url = '/api/getList'

  const data = {
    albumid: id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSoundLike (id) {
  const url = '/api/getSoundLike'

  const data = {
    type: 7,
    sound_id: id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
