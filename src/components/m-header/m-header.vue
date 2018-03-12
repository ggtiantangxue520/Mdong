<template>
  <div class="m-header">
    <router-link tag="div" class="icon" to="/recommend"></router-link>
    <div class="he-ri">
      <router-link tag="i" to="/search" class="icon-search"></router-link>
      <router-link tag="i" to="/user" class="icon-mine"></router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    color: $color-theme
    background: $color-highlight-background
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 12px
      margin-left: 15px
      width: 100px
      height: 20px
      margin-right: 9px
      bg-image('logo')
      background-size: 100px 20px
    .he-ri
      padding-top: 10px
      float: right
      margin-right: 10px
      .icon-search
        font-size: 30px
        color: $color-ban-ll
      .icon-mine
        font-size: 30px
        padding-left: 15px
        color: $color-ban-ll
</style>
