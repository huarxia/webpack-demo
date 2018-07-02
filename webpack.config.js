/**
 * webpack 配置文件
 */

// 处理路径相关
const path = require('path');
// 自动创建html文件，并将打包js文件自动引入html中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除打包目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 将css打包成文件而不是style插入文档中
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextWebpackPlugin({
    filename: 'assets/css/index.css'
})
module.exports = {
    // 入口
    entry: './src/assets/js/index.js',
    // 输出目录及文件名字
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/app.js',
        // 资源基础路径，设置XXX就会在原有路径前加上XXX
        // 不是在打包输出文件加，而是资源在最终访问时加
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            // 使用模板，将打包好的js加入进去
            template: './src/index.html'
        }),
        // 打包前删除旧的文件
        new CleanWebpackPlugin(['dist']),
        extractCss
    ],
    // 把资源打包到内存，并且提供实时刷新页面
    devServer: {
        // 当服务启动时，自动打开浏览器
        open: true,
        // 服务启动的端口号
        port: 8888,
        // 控制访问的本地目录
        contentBase: './',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                // 匹配css文件
                test: /\.css$/,
                // style-loader 将已经打包好的css插入html中
                // use: ['style-loader', 'css-loader']
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // ext 表示文件后缀
                        name: 'assets/images/[name].[hash:8].[ext]',
                        limit: 8192 // 8K, 大于8K不转换为base64 小于就不转换使用路径模式
                    }
                }]
                // filename: '[local].[hash:8].[ext]'
            },
            {
                test: /\.(ttf|woff2?|eot|svg|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
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
