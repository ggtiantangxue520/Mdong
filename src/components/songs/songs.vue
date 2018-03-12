<template>
  <div>
    <scroll ref="songs" class="songs">
      <div>
        <div class="head">
          {{songTypeName}}
          <span @click="selectType()">类型 <i class="icon-back"></i></span>
        </div>
        <div class="songs-item">
          <div class="item-list" @click="selectItem(item)" v-for="item,index in songTypeList">
            <div>
              <img v-lazy="item.cover_image"/>
              <span></span>
            </div>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <song-type ref="songType"></song-type>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getSongs} from 'api/songs'
import SongType from 'base/song-type/song-type'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      run: []
    }
  },
  computed: {
    ...mapGetters([
      'songTypeList',
      'songTypeName'
    ])
  },
  created () {
    this._getSongs()
  },
  methods: {
    selectType () {
      this.$refs.songType.show()
    },
    selectItem (item) {
      this.$router.push({
        path: `/songs/${item.id}`
      })
      this.setSongsList(item)
    },
    changeImg (list) {
      list.forEach((item) => {
        item.cover_image = `//static.missevan.com/coversmini/${item.cover_image}`
      })
      return list
    },
    _getSongs () {
      getSongs().then((res) => {
        if (res.success) {
          this.setSongTypeList(this.changeImg(res.albums))
          setTimeout(() => {
            this.$refs.songs.refresh()
          }, 120)
        }
      })
    },
    ...mapMutations({
      setSongTypeList: 'SET_SONG_TYPE_LIST',
      setSongsList: 'SET_SONGS_LIST'
    })
  },
  components: {
    Scroll,
    SongType
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box
  .songs
    background: $color-border
    position: fixed
    width: 100%
    z-index: 200
    top: 88px
    overflow: hidden
    bottom: 0
    .head
      margin: 15px
      padding: 2px 5px
      border-left: 4px solid $color-theme
      span
        float: right
        border: 1px solid #ddd
        padding: 3px 10px
        border-radius: 12px
        color: $color-text-l
        font-size: $font-size-medium
        background: $color-background
        i
          display: inline-block
          transform: rotate(180deg)
    .songs-item
      display: flex
      flex-wrap: wrap
      margin: 12px
      .item-list
        width: 50%
        padding:7px
        div
          position: relative
          border-radius: 5px
          overflow: hidden
          span
            position: absolute
            bottom: 0
            width: 100%
            height: 36px
            background: linear-gradient(180deg,transparent,rgba(0,0,0,.26))
          img
            width: 100%
            display: block
        p
          height: 32px
          overflow: hidden
          font-size: $font-size-medium
          line-height: $font-size-medium-x
          margin: 5px 0
</style>
