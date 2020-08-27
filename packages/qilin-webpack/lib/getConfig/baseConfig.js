'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var webpack = _interopDefault(require('webpack'))
var fs = require('fs')
var getBabelOpts = _interopDefault(require('./babelOpts'))
var path = require('path')
var getHtmlConfig = _interopDefault(require('./htmlConfig'))
var utils = require('@qilinjs/utils')

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

function handelBaseConfig(webpackConfig, opts) {
  const env = opts.env,
    cwd = opts.cwd,
    config = opts.config,
    absOutputPath = opts.absOutputPath //resolve

  webpackConfig.resolve.modules
    .add('node_modules')
    .add(path.join(__dirname, '../../node_modules'))
    .end()
    .extensions.merge([
      '.web.js',
      '.wasm',
      '.mjs',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json'
    ])

  if (config.alias) {
    Object.keys(config.alias).forEach(key => {
      webpackConfig.resolve.alias.set(key, config.alias[key])
    })
  }

  const htmlConfig = getHtmlConfig(opts)
  console.log(`use html template:   ${utils.chalk.cyan(htmlConfig['template'].replace(cwd, ''))}`) // plugins

  webpackConfig.plugin('html-webpack-plugin').use(require.resolve('html-webpack-plugin'), [htmlConfig])

  if (config.useAntd) {
    webpackConfig.plugin('antd-dayjs').use(require.resolve('antd-dayjs-webpack-plugin'))
  } // define plugin

  let define = config.define || {}
  webpackConfig.plugin('define').use(webpack.DefinePlugin, [_objectSpread2({}, define)]) // progress

  webpackConfig.plugin('progress').use(require.resolve('webpackbar'), [{}])
  let copyFiles = config.copy || []
  let copyResultFiles = copyFiles.map(item => {
    return typeof item === 'string'
      ? {
          from: path.join(cwd, item),
          to: absOutputPath
        }
      : item
  }) // copy

  webpackConfig.plugin('copy').use(require.resolve('copy-webpack-plugin'), [
    [
      fs.existsSync(path.join(cwd, 'public')) && {
        from: path.join(cwd, 'public'),
        to: absOutputPath
      },
      ...copyResultFiles
    ].filter(Boolean)
  ]) // error handle

  webpackConfig.plugin('friendly-error').use(require.resolve('friendly-errors-webpack-plugin'), [
    {
      clearConsole: false
    }
  ]) // manifest

  const babelOpts = getBabelOpts(opts) // module rule

  webpackConfig.module
    .rule('js')
    .test(/\.(js|mjs|jsx|ts|tsx)$/)
    .include.add(cwd)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use('cache-loader')
    .loader(require.resolve('cache-loader'))
    .end()
    .use('thread-loader')
    .loader(require.resolve('thread-loader'))
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOpts)
  webpackConfig.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: config.inlineLimit || 10000,
      name: 'images/[name].[hash:8].[ext]',
      esModule: false
    })
  webpackConfig.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false
    })
  webpackConfig.module
    .rule('fonts')
    .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false
    })
  webpackConfig.module
    .rule('plaintext')
    .test(/\.(txt|text|md)$/)
    .use('raw-loader')
    .loader(require.resolve('raw-loader')) // externals

  if (config.externals) {
    webpackConfig.externals(config.externals)
  } // node shims

  webpackConfig.node.merge({
    setImmediate: false,
    module: 'empty',
    dns: 'mock',
    http2: 'empty',
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  })
  return webpackConfig
}

exports.default = handelBaseConfig
