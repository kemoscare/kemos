const path = require('path')
const env = process.env.NODE_ENV
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// No need, automatic in production
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    mode: env === 'development' ? 'development' : 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    plugins: [
        new MiniCSSExtractPlugin({
            name: '[name].css',
            chunkFileName: '[id].css',
            ignoreOrder: false
        }),
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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            hmr: env === 'development'
                        }
                    },
                    'css-loader'
                ]
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
    },
    devServer: {
        publicPath: '/',
        contentBase: './public',
        hot: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
