/**
 * webpack 配置文件
 */

// 处理路径相关
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
}
