const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.[hash:12].min.js',
        publicPath: ''
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('style-content[hash:10].css'),
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        })
    ],
    //
    module: {
        loaders: [

            {test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.jsx/, loaders: ['babel'], exclude: /node_modules/ },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("postcss-loader!сss-loader?minimize&localIdentName=[hash:base64:10]")
            },
            {
                test: /\.less$/,
                loader:  ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.jpg$/,
                loader: 'file?name=images/[hash:12].[ext]'
            },
            {
                test: /\.eot|\.ttf|\.svg|\.woff2?/,
                loader: 'file?name=fonts/[hash:12].[ext]'
            }
        ]
    }
};