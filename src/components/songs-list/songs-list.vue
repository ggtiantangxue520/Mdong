<template>
  <transition name="slide">
    <div class="songs-list">
      <music-list :songs="songs" :title="imgHead.title" :bgImage="imgHead.cover_image"></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getList} from 'api/songs'
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'

  export default {
    data () {
      return {
        imgHead: {},
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'songsList'
      ])
    },
    created () {
      this._getList()
    },
    methods: {
      changeImg (list) {
        list.forEach((item) => {
          item.cover_image = `//static.missevan.com/coversmini/${item.cover_image}`
        })
        return list
      },
      _getList () {
        if (!this.songsList.id) {
          this.$router.push('/songs')
          return
        }
        getList(this.songsList.id).then((res) => {
          if (res.status === ERR_OK) {
            res.info.album.cover_image = `//static.missevan.com/coversmini/${res.info.album.cover_image}`
            this.imgHead = res.info.album
            this.songs = this.changeImg(res.info.sounds)
          }
        })
      }
    },
    components: {
      MusicList
    },
    watch: {
      songsList (newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        this._getList()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .songs-list
    position: fixed
    z-index: 250
    top: 0px
    left: 0
    right: 0
    bottom: 0
    background: $color-highlight-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>
