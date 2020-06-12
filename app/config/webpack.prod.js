const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MiniCSSExtractPlugin({
            name: '[name].css',
            chunkFileName: '[id].css',
            ignoreOrder: false
        })
    ],
    module: {
        rules: [
            {
            test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
})

