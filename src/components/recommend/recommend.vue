<template>
  <div class="recommend">
    <scroll ref="scroll"  class="recommend-content" :data="run">
      <div>
        <div>
          <div v-if="banner.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
              <div v-for="item in banner">
                <a :href="item.url">
                  <img class="needsclick" @load="loadImage" :src="item.pic">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <hot-list :list="sound" @select="selectItem" title="人气"></hot-list>
        <item-list :list="channel" @select="selectItem" title="频道"></item-list>
        <main-list v-for="item,index in musicList" @more="goMore" :list="item" @select="selectItem" :title="item.title"></main-list>
      </div>
    </scroll>
    <load v-if="loadLoon"></load>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/Slider/Slider'
  import Load from 'base/load/load'
  import ItemList from 'components/item-list/item-list'
  import HotList from 'components/item-list/hot-list'
  import MainList from 'components/main-list/main-list'
  import {getBanner, getIndex} from 'api/recommend'
  import {createMovie} from 'common/js/movie'
  import {ERR_OK} from 'api/config'
  import {changeSong} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [changeSong],
    data () {
      return {
        banner: [],
        channel: [],
        sound: [],
        musicList: [],
        run: [],
        loadLoon: true
      }
    },
    created () {
      this._getBanner()
      this._getIndex()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      addList (list) {
        list.forEach((item) => {
          item.objects_point = this.changeImg(item.objects_point)
          item.objects_point.title = item.title
          item.objects_point.id = item.id
          this.musicList.push(item.objects_point)
        })
      },
      getHotJson(str) {
        let value = JSON.parse(str).recommend.list
        let hot = []
        for (let key in value) {
          hot.push(value[key])
        }
        return this._normalizeMovie(hot)
      },
      goMore (list) {
        this.$router.push({
          path: `/recommend/${list.id}`
        })
        this.setClassifyList(list)
      },
      _normalizeMovie (list) {
        let ret = []
        list.forEach((item) => {
          ret.push(createMovie(item))
        })
        return ret
      },
      _getBanner () {
        getBanner().then((res) => {
          if (res.status === ERR_OK) {
            this.banner = res.info.banner
            this.channel = res.info.channel
            this.sound = this.changeImg(res.info.sound)
            setTimeout(() => {
              this.run = [1]
            }, 120)
          }
        })
      },
      _getIndex () {
        getIndex().then((res) => {
          this.addList(res.music)
          setTimeout(() => {
            this.run = [2]
            this.loadLoon = false
          }, 120)
        })
      },
      ...mapMutations({
        setClassifyList: 'SET_CLASSIFY_LIST'
      })
    },
    components: {
      Scroll,
      Slider,
      ItemList,
      HotList,
      MainList,
      Load
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background: $color-border
    .recommend-content
      height: 100%
      overflow: hidden
   .slider-wrapper
     position: relative
</style>
