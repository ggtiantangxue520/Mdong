<template>
  <transition name="slide">
    <scroll class="classify-list" :data="classifies">
      <div>
        <div class="list" v-for="item,index in classifies">
          <div class="head">
            <span>{{item.title ? item.title : '推荐'}}</span>
          </div>
          <song-list :songs="item" @select="selectItem"></song-list>
        </div>
      </div>
    </scroll>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {getClassifyList, getClassifyMenu} from 'api/classify'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import {ERR_OK} from 'api/config'
  import {getSound} from 'api/movie'

  export default {
    data () {
      return {
        classifyId: [],
        classifies: []
      }
    },
    computed: {
      ...mapGetters([
        'classifyList'
      ])
    },
    created () {
      this._getClassifyList(this.classifyList.id)
    },
    methods: {
      takeId (list) {
        list.forEach((item) => {
          if (this.findIndex(this.classifyId, item.catalog_id) === -1) {
            this.classifyId.push(item.catalog_id)
            this._getClassifyMenu(item.catalog_id)
          }
        })
      },
      findIndex (list, id) {
        return list.findIndex((item) => {
          return item === id
        })
      },
      changeImg (list) {
        list.forEach((item) => {
          item.cover_image = `//static.missevan.com/coversmini/${item.cover_image}`
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
          this._getSound(item.id)
        }
      },
      _getSound (id) {
        getSound(id).then((res) => {
          if (res.state === ERR_OK) {
            this.setMovie(this.change(res.info.sound))
          }
        })
      },
      _getClassifyList (id) {
        if (!this.classifyList.id) {
          this.$router.back()
        }
        getClassifyList(id).then((res) => {
          if (res.status === ERR_OK) {
            res.info.title = '全区动态'
            this.classifies.push(this.changeImg(res.info))
            this.takeId(res.info)
          }
        })
      },
      _getClassifyMenu (id) {
        getClassifyMenu(id).then((res) => {
          if (res.state === ERR_OK) {
            this.classifies.push(this.changeImg(res.info[id]))
          }
        })
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE'
      })
    },
    watch: {
      classifyList (newList, oldList) {
        if (newList.id === oldList.id) {
          return
        }
      }
    },
    components: {
      SongList,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .classify-list
    position: fixed
    z-index: 200
    top: 44px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    background: $color-highlight-background
    .list
      padding: 20px
      .head
        margin-bottom: 10px
        span
          color: $color-ban-ll
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>
