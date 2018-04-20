let webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
let HtmlWebpackPlugin = require('html-webpack-plugin');
let merge = require('webpack-merge');//合并配置
let baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig,{
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './app.js'
            ]
    },
    output: {
        path: __dirname + '/../build/',
        publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].[chunkhash].min.js'
    },
    devtool: '#eval-source-map',
    plugins: [
        // 设置变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});
