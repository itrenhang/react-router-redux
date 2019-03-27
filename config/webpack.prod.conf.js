const webpack = require('webpack'); //引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge'); //合并配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig, {
    mode: "production",
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/../build/',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].[chunkhash].min.js'
    },
    plugins: [
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 抽取css样式
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].[chunkhash].css',
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static/icons'),
            to: path.resolve(__dirname, '../build/static/icons')
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: 'react',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(
            [__dirname + '/../build/static'], //匹配删除的文件
            {
                root: __dirname + '/../', //根目录
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        )
    ],
    optimization: {
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                styles: {
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                common: {
                    chunks: "all",
                    minChunks: 2,
                    name: 'common',
                    enforce: true,
                    priority: 8
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    enforce: true,
                    priority: 10,
                }
            }
        },
        minimize: true
    }
});