'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var terserOptions = _interopDefault(require('./terserOptions'))

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }

  return obj
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
      })
    }
  }

  return target
}

const deepmerge = require('deepmerge')
function handelProdConfig(webpackConfig, opts) {
  const config = opts.config
  webpackConfig.output.filename(`js/[name].[contenthash:8].js`).chunkFilename(`js/[name].[chunkhash:8].js`) // mini-css-extract plugin

  webpackConfig.plugin('mini-css-extract').use(require.resolve('mini-css-extract-plugin'), [
    {
      filename: 'css/[name].[contenthash:8].style.css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      ignoreOrder: true
    }
  ]) // optimization
  // don't emit files if have error

  webpackConfig.optimization.noEmitOnErrors(true) // don't show hints when size is too large

  webpackConfig.performance.hints(false)
  webpackConfig.optimization.minimizer('terser').use(require.resolve('terser-webpack-plugin'), [
    {
      terserOptions: deepmerge(terserOptions, config.terserOptions || {}),
      sourceMap: config.devtool !== false,
      cache: true,
      parallel: true,
      extractComments: false
    }
  ])
  webpackConfig.optimization.minimizer('css').use(require.resolve('optimize-css-assets-webpack-plugin'), [{}])
  webpackConfig.optimization.splitChunks(
    _objectSpread2(
      {
        // chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
        // minSize: 20000, // 最小尺寸，20000
        // minChunks: 1, // 最小 chunk , 默认1
        // maxAsyncRequests: 30, // 最大异步请求数， 默认5
        // maxInitialRequests: 30, // 最大初始化请求书，默认3
        automaticNameDelimiter: '.'
      },
      config.splitChunks ? config.splitChunks : {}
    )
  )
  return webpackConfig
}

exports.default = handelProdConfig
