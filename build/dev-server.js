require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getBanner', function (req, res) {
  var url = 'https://www.missevan.com/mobileWeb/newHomepage3'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getIndex', function (req, res) {
  var url = 'https://www.missevan.com/sound/newhomepagedata'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSongs', function (req, res) {
  var url = 'https://www.missevan.com/explore/tagalbum'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getClassify', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/catalogRoot'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getType', function (req, res) {
  var url = 'https://www.missevan.com/malbum/recommand'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getList', function (req, res) {
  var url = 'https://www.missevan.com/sound/soundalllist'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSound', function (req, res) {
  var url = 'https://www.missevan.com/sound/getsound'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSoundLike', function (req, res) {
  var url = 'https://www.missevan.com/sound/getsoundlike'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getAlbumList', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/albumList'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getClassifyList', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/catalogRank'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getClassifyMenu', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/catalogMenu'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getHotsearch', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/hotsearch'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSearch', function (req, res) {
  var url = 'https://app.missevan.com/mobile/site/search'
  axios.get(url, {
    headers: {
      referer: 'https://app.missevan.com',
      host: 'app.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSortedImage', function (req, res) {
  var url = 'https://www.missevan.com/sound/getSortedImage'
  axios.get(url, {
    headers: {
      referer: 'https://www.missevan.com',
      host: 'www.missevan.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
