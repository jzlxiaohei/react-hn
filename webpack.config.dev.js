var webpack = require('webpack')
var path = require('path')


module.exports = {
    //entry: "./client/Index.jsx",
    entry: {
        'main':[
            'webpack-hot-middleware/client?reload=true',
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

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            '[absolute-resource-path]", "[absolute-resource-path]')
    ]
}