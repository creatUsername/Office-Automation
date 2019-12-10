'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.PORT || 8080

// https://cli.vuejs.org/zh/config/#css-sourcemap

module.exports = {
  publicPath: '/',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 相对于 outputDir 的放置生成的静态资源目录
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    port,
    open: process.env.NODE_ENV === 'development',
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:5000/`,
        target: `http://127.0.0.1:${port}/mock`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: process.env.NODE_ENV === 'development' ? require('./mock/mock-server.js') : '',
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // svg-sprite-loader
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
  }
}