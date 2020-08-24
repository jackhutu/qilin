'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var Config = _interopDefault(require('webpack-chain'))
var handleBaseConfig = _interopDefault(require('./baseConfig'))
var handleDevConfig = _interopDefault(require('./devConfig'))
var handleProdConfig = _interopDefault(require('./prodConfig'))
var handleCssConfig = _interopDefault(require('./cssConfig'))
var handleAnalyzeConfig = _interopDefault(require('./analyzeConfig'))
var path = require('path')

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }

  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args)

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }

      _next(undefined)
    })
  }
}

function getConfig(_x) {
  return _getConfig.apply(this, arguments)
}

function _getConfig() {
  _getConfig = _asyncToGenerator(function*(opts) {
    const env = opts.env,
      entry = opts.entry,
      cwd = opts.cwd,
      config = opts.config
    let webpackConfig = new Config()
    const absOutputPath = path.join(cwd, config.outputPath || 'dist')
    opts.absOutputPath = absOutputPath
    webpackConfig.mode(env) // entry

    if (entry) {
      Object.keys(entry).forEach(key => {
        webpackConfig.entry(key).add(entry[key])
      })
    } // output

    webpackConfig.output.path(absOutputPath).publicPath(config.publicPath)
    handleBaseConfig(webpackConfig, opts)
    if (env === 'development') handleDevConfig(webpackConfig, opts)
    if (env === 'production') handleProdConfig(webpackConfig, opts)
    handleCssConfig(webpackConfig, opts)
    if (process.env.ANALYZE) handleAnalyzeConfig(webpackConfig, opts)
    const result = webpackConfig.toConfig()
    return result
  })
  return _getConfig.apply(this, arguments)
}

exports.default = getConfig
