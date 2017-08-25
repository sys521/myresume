
const path = require('path'),
    webpack = require("webpack"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier');


let base = {
	    index:'./app/index.js',
};

module.exports = {
  // https://webpack.js.org/configuration/devtool/#devtool
//   devtool:'source-map',
  // https://webpack.js.org/configuration/target/#target
  target:"web",
  entry:base,
  output: {
  	path: path.resolve(__dirname, '../bin'),
    filename: '[name].js'
  },
  resolve:{
    alias:{
        jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
        mod: path.resolve(__dirname, "js/mod"),
        less: path.resolve(__dirname, "less")
    }
  },
  plugins:[
    new ExtractTextPlugin({
                filename: "[name].css",
                disable: false,
                allChunks: true
            }),
    new webpack.ProvidePlugin({
            $: "jquery"
        })       
    ],
  module:{
    //entry => loaders ==> webpack ==> output
    rules:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                  loader:'babel-loader',
                  query: {
                    presets: ['es2015']
                }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:{
                        loader:'css-loader',
                        options: {
                           sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader',{
                        loader:'less-loader',
                        options: {
                           sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader',{
                        loader:'sass-loader',
                        options: {
                           sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                use: {
                    loader:'file-loader',
                    options:{
                        name:'[name]_[sha512:hash:base64:7].[ext]'
                    }
                }
            },
            {
                test: /\.html/,
                use:{
                    loader:"html-loader",
                    options:{
                        minimize: false,
                        attrs:false
                    }
                }
            }
    ]
  }
};
