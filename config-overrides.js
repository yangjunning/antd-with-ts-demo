const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackPlugin, addDecoratorsLegacy, useBabelRc } = require('customize-cra')
const path = require('path')
// 补充：对开发友好，打包完成桌面提醒
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css' // 按需加载
    style: true, // antd 自定义主题 less
  }),
  // antd 自定义主题 less 变量覆盖全局 依赖 less、less-loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),

  // 使用 Day.js 替换 momentjs 优化打包大小
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  // 允许使用 .babelrc.js 文件进行Babel配置。
  useBabelRc(),
  // 装饰器依赖 @babel/plugin-proposal-decorators
  addDecoratorsLegacy(),
  // 配置别名
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src') // 不要使用 @，会和私有库冲突
  }),
  // 打包编译完成提醒
  addWebpackPlugin(new WebpackBuildNotifierPlugin({
    title: "My Project Webpack Build",
    logo: path.resolve("./img/favicon.ico"),
    suppressSuccess: true
  }))
);
