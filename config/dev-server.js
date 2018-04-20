var path = require('path')
var express = require('express')
var webpack = require('webpack')

var proxyMiddleware = require('http-proxy-middleware')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var webpackConfig = require('./webpack.dev.conf')

var server = express()
var compiler = webpack(webpackConfig)

// 热重载指定
let devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})
let hotMiddleware = webpackHotMiddleware(compiler)
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

server.use(devMiddleware)

server.use(hotMiddleware)

let DIST_DIR = path.join(__dirname, "../build/"),
    PORT = 3000;
    // 静态资源地址
server.use(express.static(DIST_DIR))

server.listen(PORT,function(){
    console.log("成功启动：localhost:"+ PORT)
})