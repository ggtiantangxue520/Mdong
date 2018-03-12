import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const recommend = (resolve) => {
  import('@/components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const songs = (resolve) => {
  import('@/components/songs/songs').then((module) => {
    resolve(module)
  })
}
const classify = (resolve) => {
  import('@/components/classify/classify').then((module) => {
    resolve(module)
  })
}
const classifyList = (resolve) => {
  import('@/components/classify-list/classify-list').then((module) => {
    resolve(module)
  })
}
const rank = (resolve) => {
  import('@/components/rank/rank').then((module) => {
    resolve(module)
  })
}
const songsList = (resolve) => {
  import('@/components/songs-list/songs-list').then((module) => {
    resolve(module)
  })
}
const search = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
}
const user = (resolve) => {
  import('@/components/user/user').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: classifyList
        }
      ]
    },
    {
      path: '/songs',
      component: songs,
      children: [
        {
          path: ':id',
          component: songsList
        }
      ]
    },
    {
      path: '/classify',
      component: classify,
      children: [
        {
          path: ':id',
          component: classifyList
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: songsList
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':id',
          component: songsList
        }
      ]
    },
    {
      path: '/user',
      component: user
    }
  ]
})
