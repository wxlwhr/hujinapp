/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 15:15:52
 * @LastEditTime: 2019-11-26 15:32:58
 * @LastEditors: Please set LastEditors
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 引入插件
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '东华软件' // page title
const port = 3000 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'html',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/': {
        ws: false,
        // target: 'http://172.16.2.12:8719',
        // target: 'http://61.181.59.73:8802',
        target: 'http://172.16.0.198:80',//*************开发环境 */
        // target: 'http://61.181.59.73:5203/',//预发布环境
        // target: ' http://192.168.21.14:8719/',//本地
        changeOrigin: true
      }
    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  transpileDependencies: [
    'swiper',
    'dom7',
    'ssr-window'
  ],
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config.plugin('js').use(new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true
                // drop_console: true // 生产环境自动删除console
              },
              warnings: false
            },
            sourceMap: false,
            parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
          }))
        }
      )
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
