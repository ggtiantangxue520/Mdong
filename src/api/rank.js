import axios from 'axios'

export function getAlbumList () {
  const url = '/api/getAlbumList'

  const data = {}

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
