<template>
  <div class="user">
    <div class="user-head">
      <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
    </div>
    <scroll ref="userLove" class="user-love" v-show="currentIndex === 0">
      <div class="main">
        <song-list :songs="favoriteList" @select="selectItem"></song-list>
      </div>
    </scroll>
    <scroll ref="userHistory" class="user-history" v-show="currentIndex === 1">
      <div class="main">
        <song-list :songs="playHistory" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import {ERR_OK} from 'api/config'
  import {getSound} from 'api/movie'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        currentIndex: 0,
        switches: [
          {name: '我喜欢的'},
          {name: '最近听的'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
      switchItem (index) {
        this.currentIndex = index
        setTimeout(() => {
          this.$refs.userLove.refresh()
          this.$refs.userHistory.refresh()
        }, 120)
      },
      selectItem (item, index) {
        if (item.id) {
          this._getSound(item.id)
        }
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
      _getSound (id) {
        getSound(id).then((res) => {
          if (res.state === ERR_OK) {
            this.setMovie(this.change(res.info.sound))
          }
        })
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE'
      })
    },
    components: {
      Switches,
      SongList,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box

  .user
    background: $color-highlight-background
    position: fixed
    width: 100%
    z-index: 200
    top: 44px
    overflow: hidden
    bottom: 0
    .user-head
      padding-top: 20px
    .user-love,.user-history
      position: fixed
      top: 100px
      bottom: 0
      width: 100%
      overflow: hidden
      .main
        padding: 10px 20px
</style>
