let webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require('webpack-merge');//合并配置
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path')
let baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig,{
    mode:"production",
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/../build/',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].[chunkhash].min.js'
    },
    plugins: [
        // 设置变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 抽取css样式
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title:'react',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(
            [__dirname+'/../build/static'],　 //匹配删除的文件
            {
                root: __dirname+'/../',       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    optimization:{
        splitChunks:{
            chunks:'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize:true
    }
});
