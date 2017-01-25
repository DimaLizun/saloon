const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');


let lessIdentifier = '[hash:base64:10]';

let lessLoader = ExtractTextPlugin.extract({
        loader: 'less-loader?minimize&localIdentName=' + lessIdentifier});



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
        new ExtractTextPlugin('style-[contenthash:10].css'),
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        })
    ],

    module: {
        loaders: [

            {test: /\.js/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.jsx/, loaders: ['babel'], exclude: /node_modules/ },
            {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'}

            /*
            { test: /\.js?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src') },
            {
                test: /\.less$/,
                loader: lessLoader,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src', 'styles')
            },
            { test: /\.(png|jpg|gif)$/,
                loader: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
                exclude: /node_modules/
            },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file',
                exclude: /node_modules/
            }*/
        ]
    }
};