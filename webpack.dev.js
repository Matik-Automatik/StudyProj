const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const config = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.[contenthash].js',
        assetModuleFilename: 'images/[contenthash][ext]',
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'assets'),
        },
        open: true,
    },
    module: {
        rules: [
            { 
                test: /\.(png|jpg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: false,
            template: './src/template.html',
        }),
    ],
}

module.exports = config