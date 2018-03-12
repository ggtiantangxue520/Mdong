<template>
  <div class="imgs-none">
    <img src="./3db888141654f610fffc200dbebe3ea7160227.png"/>
    <p>{{message}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      message: {
        type: String,
        default: '暂时没有图片'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .imgs-none
    padding-top: 30px
    text-align: center
    width: 100%
    img
      width: 60%
    p
      margin-top: 20px
</style>
