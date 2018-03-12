<template>
  <div>
    <div ref="minPlayer" class="min-player"
         v-show="imgs.length" :class="{'hidden': hideMin}"
         @touchstart.prevent="playerTouchStart"
         @touchmove.prevent="playerTouchMove"
      >
      <div class="middle-img">
        <div ref="imgContentMin" class="img-content"></div>
      </div>
      <div class="control" @click="togglePlaying">
        <div class="control-i" v-show="!playing">
          <i class="icon-play"></i>
        </div>
      </div>
      <div class="times" @click="hide">
        <span>X</span>
      </div>
    </div>
    <div ref="player" class="player" :class="{'leave' : leave}" v-show="movie.id">
      <div class="come" @click="come">
        <img src="./f6b4a63596f56f2bc77d4fb467cab85c160911.gif" alt=""/>
        <!--<i class="icon-back"></i>-->
      </div>
      <div class="bank" @click="bank">
        <i class="icon-back"></i>
      </div>
      <div class="normal-player">
        <div class="background">
          <img width="100%" height="100%" :src="movie.cover_image" alt=""/>
        </div>
        <div class="middle">
          <!--<div class="middle-load" :class="{'hidden': load}">-->
            <!--<load :message="message"></load>-->
          <!--</div>-->
          <div class="middle-item">
            <div class="bg" :class="bgCls">
              <img width="100%" height="100%" :src="movie.cover_image" alt=""/>
            </div>
          </div>
          <div class="middle-img" v-show="imgs.length">
            <div ref="imgContent" class="img-content"></div>
            <!--<img class="h100" src="http://static.missevan.com/mimages/201509/15/3f68b5421184eff22d60417274201353145922.jpeg"/>-->
          </div>
        </div>
        <div class="play-type" @click="changeMode">
          <i :class="playType"></i>
        </div>
        <div class="playing" @click="togglePlaying">
            <i :class="playIcon"></i>
        </div>
      </div>
      <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
      <div class="love">
        <i class="icon" :class="getFavoriteIcon(movie)" @click="toggleFavorite(movie)"></i>
      </div>
      <div class="playMain">
        <div class="tab">
          <div class="tab-list" @click="goTab(1)">
            <span class="tab-link" :class="{'active': tabActive === 1}">简介</span>
          </div>
          <div class="tab-list" @click="goTab(2)">
            <span class="tab-link" :class="{'active': tabActive === 2}">图片</span>
          </div>
        </div>
        <scroll ref="scroll" class="tab-main" v-show="tabActive === 1">
          <div>
            <div class="head">
              <div>{{movie.soundstr}}</div>
              <div><span class="icon-play"><i></i> {{movie.view_count_formatted}}</span><span class="icon-playlist"> {{movie.comment_count}}</span> <span>音频ID: {{movie.id}}</span></div>
              <div>
                <span>简介</span>
                <div v-html="intro(movie.intro)"></div>
              </div>
            </div>
            <div class="user">
              <div class="left">
                <img v-lazy="userCenter.icon"/>
              </div>
              <div class="right">
                <div>{{userCenter.username}}</div>
                <p>发布于: {{dataTime(movie.create_time)}}</p>
              </div>
            </div>
            <main-list :list="albums" v-show="albums.length" @select="goSongs" title="音频相关"></main-list>
            <main-list :list="similar" v-show="similar.length" @select="selectItem" title="相似音频"></main-list>
          </div>
        </scroll>
        <scroll ref="imgs" class="comment" v-show="tabActive === 2">
          <div>
            <sorted-image @select="selectImg" :imgs="imgs"></sorted-image>
          </div>
        </scroll>
      </div>
      <audio id="audio"  @timeupdate="updateTime" @canplay="ready" @error="error" @ended="end" ref="audio" :src="movie.soundurl_64"></audio>
      <max-img ref="maxImg" :maxImg="maxImg"></max-img>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Load from 'base/loading/load'
import Scroll from 'base/scroll/scroll'
import SortedImage from 'base/sorted-image/sorted-image'
import ProgressBar from 'base/progress-bar/progress-bar'
import MaxImg from 'base/shade/max-img'
import MainList from 'components/main-list/main-list'
import {getSoundLike} from 'api/songs'
import {getSortedImage} from 'api/movie'
import {changeSong} from 'common/js/mixin'
import {playMode} from 'common/js/config'

export default {
  mixins: [changeSong],
  data () {
    return {
      leave: false,
      songReady: false,
      load: false,
      currentTime: 0,
      albums: [],
      similar: [],
      message: '正在加载...',
      tabActive: 1,
      userCenter: {},
      imgs: [],
      maxImg: '',
      isChangeImg: false,
      ImgList: [],
      ImgNum: 0,
      timer: null,
      touch: {},
      hideMin: false
    }
  },
  created () {
  },
  methods: {
    togglePlaying () {
      // if (!this.songReady) {
      //   return
      // }
      this.setPlaying(!this.playing)
    },
    playerTouchStart (e) {
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
      this.touch.left = this.$refs.minPlayer.offsetLeft
      this.touch.top = this.$refs.minPlayer.offsetTop
      this.touch.MaxWidth = this.$refs.player.clientWidth
      this.touch.MaxHeight = this.$refs.player.clientHeight
      this.touch.MinWidth = this.$refs.minPlayer.clientWidth
      this.touch.MinHeight = this.$refs.minPlayer.clientHeight
    },
    playerTouchMove (e) {
      let deltaX = e.touches[0].pageX - this.touch.startX
      let deltaY = e.touches[0].pageY - this.touch.startY
      if (this.touch.left + deltaX < this.touch.MaxWidth - this.touch.MinWidth && this.touch.left + deltaX > 0) {
        this.$refs.minPlayer.style.left = this.touch.left + deltaX + 'px'
      }
      if (this.touch.top + deltaY < this.touch.MaxHeight - this.touch.MinHeight && this.touch.top + deltaY > 0) {
        this.$refs.minPlayer.style.top = this.touch.top + deltaY + 'px'
      }
    },
    hide () {
      this.hideMin = true
    },
    come () {
      this.leave = false
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.imgs.refresh()
      }, 120)
    },
    ready () {
      // this.songReady = true
      this.load = true
    },
    error () {
      this.message = '加载失败'
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      this.setPlaying(false)
    },
    bank () {
      this.leave = true
    },
    intro (str) {
      if (!str) {
        return '暂无简介'
      }
      return str
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlaying(true)
    },
    goTab (num) {
      this.tabActive = num
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.imgs.refresh()
      }, 120)
    },
    goSongs (item, index) {
      this.setSongsList(item)
      this.leave = true
      this.$router.push({
        path: `/songs/${item.id}`
      })
    },
    lookImgNum (list, time) {
      for (var i = 0; i < list.length; i++) {
        if (i < list.length - 1) {
          if (list[i].stime < time && list[i + 1].stime > time) {
            return i
          }
        } else {
          return list.length - 1
        }
      }
      return 0
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
      if (this.imgs.length) {
        let index = this.lookImgNum(this.imgs, this.currentTime)
        this.$refs.imgContent.style.backgroundImage = `url(${this.imgs[index].original_cover})`
        this.$refs.imgContentMin.style.backgroundImage = `url(${this.imgs[index].original_cover})`
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 2
      this.setPlayMode(mode)
    },
    selectImg (item, index) {
      this.maxImg = item.original_cover
      this.$refs.maxImg.show()
    },
    dataTime (time) {
      let date = new Date(time * 1000)
      let Y = date.getFullYear()
      let M = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return `${Y}/${M}/${D} ${h}:${m}`
    },
    onProgressBarChange(percent) {
      const currentTime = this.movie.duration / 1000 * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    _getSoundLike (id) {
      getSoundLike(id).then((res) => {
        if (res.success) {
          this.albums = res.successVal.albums ? (this.changeImg(res.successVal.albums)) : []
          this.similar = res.successVal.sounds ? (this.changeImg(res.successVal.sounds)) : []
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 120)
        }
      })
    },
    _getSortedImage (id) {
      getSortedImage(id).then((res) => {
        if (res.success) {
          this.imgs = res.info ? res.info : []
          if (this.imgs.length) {
            this.$refs.imgContent.style.backgroundImage = `url(${this.imgs[0].original_cover})`
            this.$refs.imgContentMin.style.backgroundImage = `url(${this.imgs[0].original_cover})`
          }
        }
      })
    },
    ...mapMutations({
      setSongsList: 'SET_SONGS_LIST',
      setPlayMode: 'SET_PLAY_MODE'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList',
      'savePlayHistory'
    ])
  },
  computed: {
    bgCls () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    percent () {
      return this.currentTime / (this.movie.duration / 1000)
    },
    playType () {
      return this.mode === 0 ? 'icon-sequence' : 'icon-loop'
    },
    ...mapGetters([
      'playing',
      'movie',
      'mode',
      'songsList',
      'favoriteList'
    ])
  },
  watch: {
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    movie (newMovie, oldMovie) {
      if (newMovie.id === oldMovie.id) {
        this.come()
        return
      }
      this.setPlaying(false)
      this.come()
      // this.load = false
      this.hideMin = false
      this._getSoundLike(newMovie.id)
      this._getSortedImage(newMovie.id)
      this.savePlayHistory(this.movie)
      this._getSound(newMovie.id)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        this.$refs.imgs.refresh()
      })
    }
  },
  components: {
    Load,
    Scroll,
    MainList,
    MaxImg,
    SortedImage,
    ProgressBar
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box 0
  .hidden
    display: none
  .leave
    transform: translate3d(100%,0,0)
  .comment
    position: fixed
    width: 100%
    top: 266px
    bottom: 0
    z-index: 200
    overflow: hidden
  .tab-main
    position: fixed
    width: 100%
    top: 266px
    bottom: 0
    z-index: 200
    overflow: hidden
  .min-player
    position: fixed
    width: 150px
    height: 100px
    bottom: 10px
    right: 70px
    z-index: 300
    background: $color-text-l
    border-radius: 10px
    padding: 5px
    .middle-img
      text-align: center
      width: 100%
      height: 100%
      border-radius: 5px
      background: $color-text-l
      .img-content
        width: 100%
        height: 100%
        background-image: url('http://static.missevan.com/mimages/201509/15/fbcdbd40bdc5d69e0e55c99487d7fa5b150609.jpeg')
        background-repeat: no-repeat
        background-position: 50%
        background-size: contain
    .control
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      .control-i
        padding: 4px 15px
        border-radius: 7px
        background: $color-ban-l
        i
          color: $color-bg-d
          font-size: $font-size-large-x
    .times
      position: absolute
      top: -6px
      right: -7px
      width: 16px
      height: 16px
      display: flex
      align-items: center
      justify-content: center
      background: $color-ban-ll
      border-radius: 50%
      border: 1px solid $color-text-d
      span
        color: $color-dialog-background
        font-size: $font-size-small-x
  .player
    position: fixed
    width: 100%
    top: 0
    bottom: 0
    z-index: 300
    background: $color-border
    transition: all 0.3s
    .come
      position: absolute
      bottom: 10px
      left: -70px
      z-index: 200
      font-size: $font-size-large-x
      color: $color-border
      width: 44px
      padding: 5px
      border-top-left-radius: 7px
      border-bottom-left-radius: 7px
      text-align: center
      i
        display: inline-block
        transform: rotate(180deg)
      img
        width: 50px
    .bank
      position: absolute
      top: 10px
      left: 10px
      z-index: 250
      font-size: $font-size-large-x
      color: $color-border
      i
        display: inline-block
    .normal-player
      position: relative
      width: 100%
      height: 220px
      background: rgba(220, 220, 220, 0.5)
      overflow: hidden
      .background
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 1
        filter: blur(10px)
      .middle
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        .middle-load
          position: absolute
          background: #f0f0f0
          top: 0
          left: 0
          right: 0
          bottom: 0
          z-index: 200
        .middle-item
          position: relative
          display: flex
          align-items: center
          justify-content: center
          width: 100%
          height: 100%
          .bg
            width: 120px
            height: 120px
            padding: 7px
            background: $color-ban-d
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            img
              border-radius: 50%
        .middle-img
          text-align: center
          position: absolute
          background: $color-background-d
          top: 0
          left: 0
          right: 0
          bottom: 0
          z-index: 0
          .img-content
            width: 100%
            height: 100%
            background-image: url('http://static.missevan.com/mimages/201509/15/fbcdbd40bdc5d69e0e55c99487d7fa5b150609.jpeg')
            background-repeat: no-repeat
            background-position: 50%
            background-size: contain
      .playing
        position: absolute
        bottom: 20px
        right: 20px
        display: inline-block
        width: 44px
        padding: 5px
        background: $color-ban-l
        border-radius: 7px
        text-align: center
        box-shadow: 0 0 2px $color-text-l
        i
          font-size: $font-size-large-x
          color: $color-bg-d
      .play-type
        position: absolute
        bottom: 20px
        left: 20px
        display: inline-block
        width: 30px
        padding: 5px
        background: $color-ban-l
        border-radius: 7px
        text-align: center
        box-shadow: 0 0 2px $color-text-l
        i
          font-size: $font-size-large-x
          color: $color-ban-lll
    .love
      position: absolute
      right: 10px
      top: 10px
      i
        font-size: $font-size-large-x
        color: $color-border
        &.icon-favorite
          color: $color-sub-theme
    .playMain
      .tab
        display: flex
        background: $color-background
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
      .head
        padding: 15px
        div
          line-height: 26px
          div
            color: $color-dialog-background
            font-size: $font-size-small-s
          span
            font-size: $font-size-medium
            color: $color-dialog-background
            margin-right: 30px
      .user
        margin: 0 15px
        padding: 15px 0
        border-top: 1px solid $color-bg-d
        border-bottom: 1px solid $color-bg-d
        display: flex
        .left
          width: 15%
          text-align: center
          img
            width: 40px
            height: 40px
            border-radius: 50%
        .right
          width: 85%
          padding-left: 10px
          div
            line-height: 24px
          p
            line-height: 20px
            font-size: $font-size-small
            color: $color-text-l
      .about
        margin: 0 15px
        padding: 15px 0
        border-top: 1px solid $color-bg-d
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
