const webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');//合并配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
let baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig,{
    mode:"development",
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './app.js'
            ]
    },
    output: {
        path: path.resolve(__dirname + '/../build/'),
        publicPath: process.env.NODE_ENV === 'development' ? '/' : '',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[id].[chunkhash].min.js'
    },
    devtool: 'eval-source-map',
    plugins: [
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].[chunkhash].css',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});
