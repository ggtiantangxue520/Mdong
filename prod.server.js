var express = require('express')
var config = require('./config/index')
var axios = require('axios')

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

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening at http://localhost:' + port + '\n')
})
