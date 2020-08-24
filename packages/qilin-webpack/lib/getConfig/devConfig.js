'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var webpack = _interopDefault(require('webpack'))

function handelDevConfig(webpackConfig, opts) {
  const config = opts.config // devtool

  const devtool = config.devtool
  webpackConfig.devtool(devtool || 'cheap-module-source-map')
  webpackConfig.output.filename(`js/[name].js`).chunkFilename(`js/[id].js`) // mini-css-extract plugin

  webpackConfig.plugin('mini-css-extract').use(require.resolve('mini-css-extract-plugin'), [
    {
      filename: 'css/[name].style.css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: true
    }
  ]) // hmr

  webpackConfig.plugin('hmr').use(webpack.HotModuleReplacementPlugin) // devServer

  return webpackConfig
}

exports.default = handelDevConfig
