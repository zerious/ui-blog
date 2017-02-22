var author = 'Author: Sam Eubank <sameubank@gmail.com>'
var chug = require('chug')
var fs = require('fs')
var json = require('lighter-json')
var dir = 'src/main/webapp/'

var pubs = chug('public')
  .each(function (asset) {
    var content = asset.content
    var path = dir + asset.path.replace(/^public\//, '')
    fs.writeFile(path, content, function (error) {
      if (error) console.error(error)
    })
  })

var cute = chug('node_modules/cute/cute.js')
  .cull('env', 'production')
  .each(function (asset) {
    var content = '// ' + author + '\n\n' + asset.content
    fs.writeFile(dir + 'cute.js', content, function (error) {
      if (error) console.error(error)
    })
  })

var views
chug('views')
  .compile()
  .then(function () {
    var cache = this.assets[0].compiledContent.cache
    views = '// ' + author + '\n\nvar views = ' + json.scriptify(cache)
    fs.writeFile(dir + 'views.js', views, function (error) {
      if (error) console.error(error)
    })
  })

var cutePattern = /(\n?)(Cute)\.([$_a-zA-Z0-9]+)(\s*=)?/g
chug.then(function () {
  var css = pubs.assets[0].minify().minifiedContent
  var js = pubs.assets[1].replace('BLOG_CSS', css)
  js.content = views + js.content
  var lib = cute.assets[0]
  chug([js, lib])
    .concat()
    .replace(cutePattern, function (match, br, lib, key, equals) {
      var name = lib + '_' + key
      var word = br ? 'var ' : ''
      return br + (equals ? word + name + ' =' : name)
    })
    .wrap()
    .minify()
    .each(function (asset) {
      var content = asset.minifiedContent
      fs.writeFile(dir + 'a.js', content, function (error) {
        if (error) console.error(error)
        else console.log('OK')
      })
    })
})
