<template>
  <div class="imgs">
    <div class="imgs-main" v-show="imgs.length" v-for="item,index in imgs">
      <div @click="selectImg(item, index)">
        <img v-lazy="item.front_cover"/>
      </div>
    </div>
    <none message="暂时没有图片" v-show="!imgs.length"></none>
  </div>
</template>

<script type="text/ecmascript-6">
  import None from 'base/none/none'
  export default {
    props: {
      imgs: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectImg (item, index) {
        this.$emit('select', item, index)
      }
    },
    components: {
      None
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box 0
  .imgs
    display: flex
    flex-wrap: wrap
    .imgs-main
      width: 33.333333%
      div
        padding: 2px
        margin: 10px
        border-radius: 5px
        border: 2px solid #979797
        img
          width: 100%
          display: block
    .imgs-none
      padding-top: 30px
      text-align: center
      width: 100%
      img
        width: 60%
      p
        margin-top: 20px
</style>
