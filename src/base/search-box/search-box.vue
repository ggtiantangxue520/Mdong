<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
    <span @click="back">取消</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      },
      back () {
        this.$router.back()
      }
    },
    created () {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 500))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 44px
    background: $color-highlight-background
    .icon-search
      font-size: 24px
      color: $color-ban-ll
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-ban-ll
      font-size: $font-size-medium
      &::placeholder
        color: $color-ban-ll
    .icon-dismiss
      font-size: 16px
      color: $color-ban-ll
    span
      color: $color-ban-ll
      padding-left: 10px
</style>
