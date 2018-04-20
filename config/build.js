let webpack = require('webpack');
let webpackConfig = require('./webpack.prod.conf');
let assetsPath = '../build/static'

webpack(webpackConfig, function(err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})