const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const merge = require('webpack-merge');//合并配置
var webpackConfigDev = require('./webpack.dev.conf')

var webpackConfig = merge(webpackConfigDev,{
    plugins:[
        new webpack.HotModuleReplacementPlugin(),        
    ]
})

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

let DIST_DIR = path.join(__dirname, "../src/"),
    PORT = 3000;
    // 静态资源地址
server.use(express.static(DIST_DIR))

server.listen(PORT,function(){
    console.log("成功启动：localhost:"+ PORT)
})