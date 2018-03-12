import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  songTypeList: [],
  songTypeName: '全部音单',
  songsList: [],
  classifyList: [],
  playing: false,
  mode: playMode.sequence,
  movie: {},
  user: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
