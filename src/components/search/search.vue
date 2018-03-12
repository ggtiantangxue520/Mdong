<template>
  <transition name="slide">
    <div class="search">
      <search-box ref="searchBox" @query="searchItem"></search-box>
        <div>
          <div class="hot" v-show="!searchList.length">
            <div class="hot-head">
              热门搜索
            </div>
            <div class="hot-main">
              <span v-for="item,index in hotSearch" @click="searchItem(item.key)">{{item.key}}</span>
            </div>
            <div class="hot-list" v-show="searchHistory.length">
              <div class="hot-history">
                历史搜索
              </div>
              <search-list @select="searchItem" :searches="searchHistory" @delete="deleteSearchHistory"></search-list>
            </div>
          </div>
          <div class="searchList" v-show="searchList.length">
            <div class="tab">
              <div class="tab-list" @click="goActive(1)">
                <span class="tab-link" :class="{'active' : list === 1}">M音</span>
              </div>
              <div class="tab-list" @click="goActive(2)">
                <span class="tab-link" :class="{'active' : list === 2}">音单</span>
              </div>
              <div class="tab-list" @click="goActive(3)">
                <span class="tab-link" :class="{'active' : list === 3}">用户</span>
              </div>
            </div>
            <div class="search-item">
              <scroll ref="item" class="item" :data="searchList" v-show="list === 1">
                <div v-show="searchList.length">
                  <song-list :songs="searchList" @select="selectItem"></song-list>
                </div>
                <none message="暂时没有音单" v-show="!searchList.length"></none>
              </scroll>
              <scroll ref="itemSong" class="item-song" :data="songList" v-show="list === 2">
                <div v-show="songList.length">
                  <main-list :list="songList" @select="select" title="推荐" :listNum="listNum"></main-list>
                </div>
                <none message="暂时没有歌曲" v-show="!songList.length"></none>
              </scroll>
              <div v-show="list === 3">
                敬请期待
              </div>
            </div>
          </div>
        </div>
        <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import SearchBox from 'base/search-box/search-box'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import SearchList from 'base/search-list/search-list'
  import None from 'base/none/none'
  import {getHotsearch, getSearch} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {getSound} from 'api/movie'
  import MainList from 'components/main-list/main-list'

  export default {
    data () {
      return {
        hotSearch: [],
        searchList: [],
        songList: [],
        list: 1,
        query: '',
        listNum: 10
      }
    },
    created () {
      this._getHotsearch()
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      searchItem (query) {
        this.query = query
        this.$refs.searchBox.setQuery(query)
        this._getSearch(3, query)
        this._getSearch(2, query)
      },
      changes (list) {
        if (!list) {
          list = []
        }
        list.forEach((item) => {
          item.cover_image = `//static.missevan.com/coversmini/${item.cover_image}`
          if (!item.soundstr) {
            item.soundstr = item.title
          }
        })
        return list
      },
      change (list) {
        list.cover_image = `https://static.missevan.com/coversmini/${list.cover_image}`
        list.soundurl = `https://static.missevan.com/${list.soundurl}`
        list.soundurl_32 = `https://static.missevan.com/${list.soundurl_32}`
        list.soundurl_64 = `https://static.missevan.com/${list.soundurl_64}`
        list.soundurl_128 = `https://static.missevan.com/${list.soundurl_128}`
        return list
      },
      selectItem (item, index) {
        if (item.id) {
          this.saveSelect()
          this._getSound(item.id)
        }
      },
      saveSelect() {
        this.saveSearchHistory(this.query)
      },
      goActive (num) {
        this.list = num
        setTimeout(() => {
          this.$refs.item.refresh()
          this.$refs.itemSong.refresh()
        }, 20)
      },
      select (item, index) {
        this.saveSelect()
        this.$router.push({
          path: `/search/${item.id}`
        })
        this.setSongsList(item)
      },
      _getSound (id) {
        getSound(id).then((res) => {
          if (res.state === ERR_OK) {
            this.setMovie(this.change(res.info.sound))
          }
        })
      },
      _getHotsearch () {
        getHotsearch().then((res) => {
          if (res.length) {
            this.hotSearch = res
          }
        })
      },
      _getSearch (type, query) {
        getSearch(type, query).then((res) => {
          if (res.state === 'error') {
            if (type === 3) {
              this.searchList = []
              return
            }
            this.songList = []
          }
          if (res.state === ERR_OK) {
            if (type === 3) {
              this.searchList = this.changes(res.info.Data)
              return
            }
            this.songList = this.changes(res.info.Data)
          }
        })
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE',
        setSongsList: 'SET_SONGS_LIST'
      }),
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory'
      ])
    },
    components: {
      SearchBox,
      Scroll,
      SongList,
      MainList,
      SearchList,
      None
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)

  .search
    background: $color-border
    position: fixed
    width: 100%
    z-index: 200
    top: 0px
    overflow: hidden
    bottom: 0
    .hot
      padding: 0 10px
      .hot-head
        padding: 10px 0
        border-bottom: 1px solid #f0f0f0
      .hot-main
        padding: 5px 0
        span
          display: inline-block
          padding: 5px 10px
          margin: 5px 5px
          background: $color-background
          border: 1px solid $color-dialog-background
          color: $color-dialog-background
          border-radius: 12px
          font-size: $font-size-medium
      .hot-list
        padding: 10px
        .hot-history
          margin-bottom: 10px
    .searchList
      .tab
        display: flex
        background: $color-ban-ll
        height: 44px
        line-height: 44px
        font-size: $font-size-medium
        .tab-list
          flex: 1
          text-align: center
          .tab-link
            padding-bottom: 5px
            color: $color-text-l
          .active
            color: $color-theme
            border-bottom: 2px solid $color-theme
      .search-item
        .item
          position: fixed
          top: 80px
          bottom: 0
          left: 0
          right: 0
          overflow: hidden
          padding: 0 10px
          background: $color-background-black
        .item-song
          position: fixed
          top: 80px
          bottom: 0
          left: 0
          right: 0
          overflow: hidden
</style>
