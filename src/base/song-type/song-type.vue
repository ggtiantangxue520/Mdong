<template>
    <scroll class="song-type" :class="{'active': hidden}" ref="songType">
      <div>
        <div class="head">
          <i class="icon-back" @click="hide()"></i>
          <span>类型选择</span>
        </div>
        <div class="whole">
          <div @click="songs()">全部音单</div>
        </div>
        <div class="type">
          <div class="img">
            <div>
              <img src="data:image/png;base64,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"/>
              <p>情感</p>
            </div>
          </div>
          <div class="type-list">
            <div class="list" v-for="item,index in emotion" @click="songs(item[0],item[1])">{{item[1]}}</div>
          </div>
        </div>
        <div class="type">
          <div class="img">
            <div>
              <img src="data:image/png;base64,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" alt=""/>
              <p>场景</p>
            </div>
          </div>
          <div class="type-list">
            <div class="list" v-for="item,index in scene" @click="songs(item[0],item[1])">{{item[1]}}</div>
          </div>
        </div>
        <div class="type">
          <div class="img">
            <div>
              <img src="data:image/png;base64,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" alt=""/>
              <p>主题</p>
            </div>
          </div>
          <div class="type-list">
            <div class="list" v-for="item,index in theme" @click="songs(item[0],item[1])">{{item[1]}}</div>
          </div>
        </div>
      </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
import {getType, getSongs} from 'api/songs'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      hidden: false,
      emotion: [],
      scene: [],
      theme: []
    }
  },
  created () {
    this._getType()
  },
  methods: {
    show () {
      this.hidden = true
    },
    hide () {
      this.hidden = false
    },
    changeImg (list) {
      list.forEach((item) => {
        item.cover_image = `//static.missevan.com/coversmini/${item.cover_image}`
      })
      return list
    },
    _getType () {
      getType().then((res) => {
        if (res.success) {
          this.emotion = res.info.情感
          this.scene = res.info.场景
          this.theme = res.info.主题
        }
      })
    },
    songs (tid, name) {
      if (!name) {
        name = '全部音单'
      }
      getSongs(tid).then((res) => {
        if (res.success) {
          this.setSongTypeList(this.changeImg(res.albums))
          this.setSongTypeName(name)
          this.hide()
        }
      })
    },
    ...mapMutations({
      setSongTypeList: 'SET_SONG_TYPE_LIST',
      setSongTypeName: 'SET_SONG_TYPE_NAME'
    })
  },
  components: {
    Scroll
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box
  .song-type
    position: fixed
    z-index: 100
    top: 88px
    left: 0
    right: 0
    bottom: 0
    background: $color-border
    transition: all 0.3s
    transform: translate3d(100%,0,0)
    .head
      position: relative
      text-align: center
      padding: 10px
      background: $color-background
      border-top: 1px solid $color-bg-d
      i
        left: 10px
        position: absolute
        color: $color-text-l
    .whole
      padding: 5px 8px
      background: $color-background
      border-top: 1px solid $color-bg-d
      div
        text-align: center
        padding:10px
        font-size: $font-size-medium
        border: 1px solid $color-theme
        border-radius: 5px
    .type
      margin-top: 10px
      display: flex
      align-items: center
      flex-wrap: wrap
      background: $color-background
      .img
        display: flex
        align-items: center
        justify-content: center
        width: 30%
        height: 100%
        img
          width: 40px
        p
          width: 100%
          text-align: center
      .type-list
        width: 70%
        display: flex
        flex-wrap: wrap
        border-left: 1px solid $color-bg-d
        .list
          width: 50%
          text-align: center
          padding: 15px
          font-size: $font-size-medium-x
          font-size: $font-size-medium
          border-right: 1px solid $color-bg-d
          border-bottom: 1px solid $color-bg-d
  .active
    transform: translate3d(0,0,0)
</style>
