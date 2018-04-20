let webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require('webpack-merge');//合并配置
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path')
let baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig,{
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 抽取css样式
        new ExtractTextPlugin(__dirname + '/build/static/css/[name].css'),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title:'react',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        // 提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CleanWebpackPlugin(
            [__dirname+'/../build/static'],　 //匹配删除的文件
            {
                root: __dirname+'/../',       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ]
});
