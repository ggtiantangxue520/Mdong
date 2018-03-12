<template>
  <div class="item-list">
    <div class="head">
      <span><i></i>{{title}}</span>
      <small @click="getMore(list)">{{more}}<i class="icon-back"></i></small>
    </div>
    <div class="main">
      <div class="section" v-for="(item,index) in list" @click="selectItem(item, index)" v-if="index < listNum">
        <div class="se-img">
          <div class="img">
            <img v-lazy="item.smallpic"/>
            <div class="font"><i class="icon-play"> {{item.follow_num}}</i><i class="icon-playlist m-l-30"> {{item.comment_count}}</i></div>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '1'
      },
      more: {
        type: String,
        default: '更多'
      },
      list: {
        type: Array,
        default: []
      },
      listNum: {
        type: Number,
        default: 4
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      getMore (list) {
        console.log(list)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  *
    box-sizing: border-box
  .item-list
    padding:8px
    .head
      margin: 10px 8px
      span
        font-size: $font-size-medium-x
        i
          display: inline-block
          vertical-align: middle
          bg-image('sprite-icons-catalog')
          background-size: 86px 86px
          width: $font-size-large-x
          height: $font-size-large-x
      small
        color: $color-text-l
        float: right
        font-size: $font-size-small-x
        i
          margin-left: 10px
          display: inline-block
          transform: rotate(180deg)
    .main
      display: flex
      flex-wrap: wrap
      div.section
        padding: 10px 8px
        width: 50%
        .se-img
          position: relative
          p
            margin-top: 5px
            height: 34px
            overflow: hidden
            font-size: $font-size-medium
            color: $color-text-ll
            line-height: 17px;
          .img
            position: relative
            height: 120px
            overflow: hidden
            border-radius: 10px
            img
              border: 1px solid $color-border
              width: 100%
            div.font
              position: absolute
              height:20px
              text-align: center
              border-bottom-right-radius: 7px
              border-bottom-left-radius: 7px
              width: 100%
              bottom: 0
              padding: 0 10px
              background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5))
              i
                color: $color-ban-ll
                font-size: $font-size-small-x
                font-weight: 700
              .m-l-30
                margin-left: 30px

</style>
