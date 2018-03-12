import {getUrl} from 'api/movie'
// import {ERR_OK} from 'api/config'

export default class Movie {
  constructor({aid, mid, author, duration, create, pic, review, title, typename, favorites}) {
    this.aid = aid
    this.mid = mid
    this.author = author
    this.create = create
    this.duration = duration
    this.pic = pic
    this.review = review
    this.title = title
    this.typename = typename
    this.favorites = favorites
  }

  getUrl () {
    if (this.url) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getUrl(this.aid).then((res) => {
        console.log(res)
      })
    })
  }
}

export function createMovie (movieData) {
  return new Movie({
    aid: movieData.aid,
    mid: movieData.mid,
    author: movieData.author,
    create: movieData.create,
    duration: movieData.duration,
    pic: movieData.pic,
    review: movieData.review,
    title: movieData.title,
    typename: movieData.typename,
    favorites: movieData.favorites
  })
}

export function createMovieTwo (movieData) {
  return new Movie({
    aid: movieData.aid,
    mid: movieData.owner.mid,
    author: movieData.owner.name,
    create: getTime(movieData.ctime),
    duration: getDuration(movieData.duration),
    pic: movieData.pic,
    review: movieData.view,
    title: movieData.title,
    typename: movieData.tname,
    favorites: movieData.stat.favorite
  })
}

function getTime (str) {
  let time = new Date(str)
  return `${time.getFullYear()}-${isTime(time.getMonth() + 1)}-${isTime(time.getDate())}  ${isTime(time.getHours())}:${isTime(time.getMinutes())}`
}

function isTime (time) {
  let value = time > 10 ? time : '0' + time
  return value
}

function getDuration (str) {
  return `${parseInt(str / 60)}:${str % 60}`
}
