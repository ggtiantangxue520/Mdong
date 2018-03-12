import axios from 'axios'

export function getSound (id) {
  const url = '/api/getSound'

  const data = {
    soundid: id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSortedImage (id) {
  const url = '/api/getSortedImage'

  const data = {
    soundid: id
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
