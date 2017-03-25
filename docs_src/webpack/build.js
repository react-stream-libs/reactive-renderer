"use strict";
exports.__esModule = true;
var path = require("path");
var ReactStaticPlugin = require("react-static-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var config = {
    entry: {
        main: [
            'babel-polyfill',
            path.resolve(__dirname, '../index.tsx'),
        ]
    },
    output: {
        filename: 'index.js',
        path: 'dist/docs',
        libraryTarget: 'umd'
    },
    plugins: [
        // new HtmlPlugin({
        //   template: path.resolve(__dirname, '../index.html'),
        // }),
        new CopyWebpackPlugin([{
                from: 'node_modules/monaco-editor/min/vs',
                to: 'vs'
            }]),
        new ReactStaticPlugin({
            routes: path.resolve(__dirname, '../Routes.tsx'),
            template: path.resolve(__dirname, '../template.tsx')
        }),
    ],
    resolve: {
        extensions: [
            '.js', '.es6', '.jsx',
            '.ts', '.tsx',
        ]
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.ts$/,
                loader: 'babel-loader!ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.tsx$/,
                loader: 'babel-loader!ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass?sourceMap',
                ],
                exclude: /app\/styles/
            }, {
                test: /\.woff$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
            }, {
                test: /\.woff2$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
            }, {
                test: /\.ttf$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.eot$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.svg$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
        ]
    }
};
module.exports = config;
