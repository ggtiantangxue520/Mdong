import * as types from './mutation-types'

const mutations = {
  [types.SET_SONG_TYPE_LIST] (state, list) {
    state.songTypeList = list
  },
  [types.SET_SONG_TYPE_NAME] (state, name) {
    state.songTypeName = name
  },
  [types.SET_SONGS_LIST] (state, list) {
    state.songsList = list
  },
  [types.SET_CLASSIFY_LIST] (state, list) {
    state.classifyList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_MOVIE] (state, movie) {
    state.movie = movie
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations
