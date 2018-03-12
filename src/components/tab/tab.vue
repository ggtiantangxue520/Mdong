<template>
  <div class="tab">
    <div class="tab-main">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/songs">
        <span class="tab-link">音单</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/classify">
        <span class="tab-link">分类</span>
      </router-link>
      <!--<div class="tab-item" @click="getTopEnter">-->
        <!--<i class="icon-back"></i>-->
      <!--</div>-->
    </div>
    <!--<div class="tab-top" :class="{'active' : topActive}">-->
      <!--<div class="top-item">-->
        <!--<router-link tag="div" class="tab-item" to="/recommend">-->
          <!--<span class="tab-link">首页</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/animation">-->
          <!--<span class="tab-link">动画</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/comic">-->
          <!--<span class="tab-link">番剧</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/guochuang">-->
          <!--<span class="tab-link">国创</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/music">-->
          <!--<span class="tab-link">音乐</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/dance">-->
          <!--<span class="tab-link">舞蹈</span>-->
        <!--</router-link>-->
      <!--</div>-->
      <!--<div class="top-item">-->
        <!--<router-link tag="div" class="tab-item" to="/science">-->
          <!--<span class="tab-link">科技</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/game">-->
          <!--<span class="tab-link">游戏</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/entertainment">-->
          <!--<span class="tab-link">娱乐</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/kichiku">-->
          <!--<span class="tab-link">鬼畜</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/film">-->
          <!--<span class="tab-link">电影</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/tv">-->
          <!--<span class="tab-link">电视剧</span>-->
        <!--</router-link>-->
      <!--</div>-->
      <!--<div class="top-item">-->
        <!--<router-link tag="div" class="tab-item" to="/life">-->
          <!--<span class="tab-link">生活</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/fashion">-->
          <!--<span class="tab-link">时尚</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/advertisement">-->
          <!--<span class="tab-link">广告</span>-->
        <!--</router-link>-->
        <!--<router-link tag="div" class="tab-item" to="/broadcast">-->
          <!--<span class="tab-link">直播</span>-->
        <!--</router-link>-->
        <!--<div class="tab-item">-->
          <!--<span class="tab-link">  </span>-->
        <!--</div>-->
        <!--<div class="tab-item">-->
          <!--<span class="tab-link">  </span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="top-item">-->
        <!--<div class="tab-item" @click="getTopEnter">-->
          <!--<i class="icon-back ro90"></i>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        topActive: false
      }
    },
    methods: {
      getTopEnter () {
        this.topActive = !this.topActive
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    position: relative
    background: $color-background
    .tab-main,.top-item
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          padding-bottom: 5px
          color: $color-text-l
        &.router-link-active
          .tab-link
            color: $color-theme
            border-bottom: 2px solid $color-theme
        .icon-back
          display: inline-block
          color: $color-text-l
          transform: rotate(-90deg)
        .ro90
          transform: rotate(90deg)
    .tab-top
      background: $color-background
      position: absolute
      width: 100%
      top: -177px
      transition: all 0.3s
      border-bottom: 1px solid $color-bg-d
    .tab-top.active
      top: 0px
</style>
