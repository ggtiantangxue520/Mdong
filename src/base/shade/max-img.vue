<template>
  <transition name="confirm-fade">
    <div class="max-img" v-show="imgHide" @click="hide">
      <div class="img-bg" @click.stop>
        <img :src="maxImg"/>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      maxImg: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        imgHide: false
      }
    },
    methods: {
      hide () {
        this.imgHide = false
      },
      show () {
        this.imgHide = true
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box
  .max-img
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    display: flex
    align-items: center
    justify-content: center
    background-color: $color-background-d
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .img-bg
        animation: confirm-zoom 0.3s
    .img-bg
      background: $color-background
      display: inline-block
      width: 90%
      padding: 10px
      border-radius: 5px
      img
        display: block
        width: 100%
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
