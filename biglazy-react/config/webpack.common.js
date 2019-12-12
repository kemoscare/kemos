const path = require('path')
const env = process.env.NODE_ENV
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// No need, automatic in production
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].[hash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "KEMOS",
            favicon: './public/favicon.ico',
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: '@svgr/webpack'
                }
            }
        ]
    },
    resolve : {
        extensions: ['.js', '.jsx', '.json']
    }
}
