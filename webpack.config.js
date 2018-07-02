/**
 * webpack 配置文件
 */

// 处理路径相关
const path = require('path');
// 自动创建html文件，并将打包js文件自动引入html中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除打包目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    // 入口
    entry: './src/assets/js/index.js',
    // 输出目录及文件名字
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'js/app.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // 使用模板，将打包好的js加入进去
            template: './src/index.html',
            inject: true
        }),
        // 打包前删除旧的文件
        new CleanWebpackPlugin(['dist'])
    ],
    // 把资源打包到内存，并且提供实时刷新页面
    devServer: {
        open: true,
        port: 8888,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                // 匹配css文件
                test: /\.css$/,
                // style-loader 将已经打包好的css插入html中
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 // 8K, 大于8K不转换为base64 小于就不转换使用路径模式
                    }
                }]
                // filename: '[local].[hash:8].[ext]'
            },
            {
                test: /\.(ttf|woff2?|eot|svg|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // webpack 排除 node_modules文件夹
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    }
}
