# wenpack 3.0 入门体验代码

### tag
- `1.0.0` 简单配置
- `2.0.0` 使用webpack插件
- `3.0.0` 使用webpack-dev-server插件
- `4.0.0` 使用loader
- `5.0.0` 使用file-loader处理图片
- `6.0.0` 使用url-loader处理图片
- `7.0.0` 使用file-loader处理字体
- `8.0.0` webpack继承babel支持高阶语法
- `9.0.0` 处理js打包路径问题以及使用CleanWebpackPlugin打包前清除打包目录

### 命令体验

```
# 本地打包
npm run build
# 本地启动webpack server
npm start
```
### 目录问题

```
devServer: {
    // 当服务启动时，自动打开浏览器
    open: true,
    // 服务启动的端口号
    port: 8888,
    // 访问的本地目录
    contentBase: './dist'
}
```

1. 服务启动时，`CleanWebpackPlugin`插件会删除打包的`dist`目录
2. 服务启动时，`webpack-dev-server`会把资源打包到内存
3. 为什么访问不到内存中的资源
