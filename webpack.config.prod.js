var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

module.exports = {
    //entry: './client/Index.jsx',
    entry: {
        'main':[
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js?v=[hash]',
        publicPath: '/dist/'
    },
    externals:{},
    module: {
        loaders: [
            {
                test: /[\.jsx|\.js ]$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader'}
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].css?v=[chunkhash]'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
           compressor: {
               warnings: false
           }
        })
    ],
    postcss: function () {
        return [autoprefixer, precss];
    },
}