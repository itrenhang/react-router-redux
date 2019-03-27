const webpack = require('webpack');
const merge = require('webpack-merge'); //合并配置
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
let webpackConfig = require('./webpack.dev.conf');
webpack(merge(webpackConfig, {
    entry: {
        app: './app.js'
    },
    plugins: [
        new CleanWebpackPlugin(
            [__dirname + '/../build/static'], //匹配删除的文件
            {
                root: __dirname + '/../', //根目录
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        ),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static/icons'),
            to: path.resolve(__dirname, '../build/static/icons')
        }])
    ]
}), function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})