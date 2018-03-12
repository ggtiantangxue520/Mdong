<template>
  <div class="classify">
    <div>
      <div class="classify-item">
        <div class="list" @click="selectItem(item)" v-for="item,index in classifyList">
          <div>
            <img :src="item.pic" alt=""/>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getClassify} from 'api/classify'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        classifyList: []
      }
    },
    created () {
      this._getClassify()
    },
    methods: {
      selectItem (item) {
        this.$router.push({
          path: `/classify/${item.id}`
        })
        this.setClassifyList(item)
      },
      _getClassify () {
        getClassify().then((res) => {
          if (res.status === ERR_OK) {
            this.classifyList = res.info
          }
        })
      },
      ...mapMutations({
        setClassifyList: 'SET_CLASSIFY_LIST'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  *
    box-sizing: border-box
  .classify
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background: $color-border
    .classify-item
      display: flex
      flex-wrap: wrap
      margin: 10px 5px
      .list
        width: 33.333333%
        padding:7px
        text-align: center
        div
          background: $color-background
          padding: 15px
          border-radius: 5px
          box-shadow: 0px 1px 1px #ddd
          img
            width: 50px
          p
            margin-top: 10px
            font-size: $font-size-medium
</style>
