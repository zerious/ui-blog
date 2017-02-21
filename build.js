var chug = require('chug')
var fs = require('fs')
var json = require('lighter-json')
var dir = 'src/main/webapp/'

chug('node_modules/cute/cute.js')
  .cull('env:production')
  .each(function (asset) {
    fs.writeFile(dir + 'cute.js', asset.content, function () {
      console.log('OK cute.js')
    })
  })

chug('/Users/sam/Projects/cute/cute.js')
  .cull('env:production')
  .each(function (asset) {
    fs.writeFile(dir + 'cute.js', asset.content, function () {
      console.log('OK cute.js')
    })
  })

chug('views')
  .compile()
  .then(function () {
    var cache = this.assets[0].compiledContent.cache
    var views = json.scriptify(cache)
    var content = 'var views = ' + views
    fs.writeFile(dir + 'views.js', content, function () {
      console.log('OK views.js')
    })
  })
