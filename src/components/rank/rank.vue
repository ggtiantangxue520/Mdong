<template>
  <div class="rank" ref="rank">
    <scroll ref="toplist" class="toplist" :data="topList">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item.album)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.album.cover_image"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.sounds">
              <span>{{index + 1}}</span>
              <span>{{song.soundstr}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
    <div class="loading-container" v-show="!topList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAlbumList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/load/load'
  // import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    created () {
      this._getAlbumList()
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      changeImg (list) {
        list.forEach((item) => {
          item.album.cover_image = `//static.missevan.com/coversmini/${item.album.cover_image}`
        })
        return list
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setSongsList(item)
      },
      _getAlbumList () {
        getAlbumList().then((res) => {
          if (res.status === ERR_OK) {
            res.info = this.changeImg(res.info)
            this.topList = res.info
          }
        })
      },
      ...mapMutations({
        setSongsList: 'SET_SONGS_LIST'
      })
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 44px
    z-index: 200
    background: $color-background-black
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-ban-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
