<template>
 <div class="load">
   <div>
     <img src="./f6b4a63596f56f2bc77d4fb467cab85c160911.gif" alt=""/>
     <p>{{message}}</p>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    message: {
      type: String,
      default: '正在加载中...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .load
    position: absolute
    display: flex
    align-items: center
    top: 0
    bottom: 0
    left: 0
    right: 0
    text-align: center
    div
      width: 100%
      img
        width: 100px
      p
        text-align: center
        width: 100%
</style>
