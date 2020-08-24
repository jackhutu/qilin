'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var webpack = _interopDefault(require('webpack'))
var FileSizeReporter = require('react-dev-utils/FileSizeReporter')
var rimraf = _interopDefault(require('rimraf'))
var utils = require('@qilin/utils')

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

process.env.NODE_ENV = 'production'
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

function clearOutput(outputPath, cwd) {
  try {
    console.log(`清理目录: ${utils.chalk.cyan(outputPath.replace(cwd, ''))}`)
    rimraf.sync(outputPath)
  } catch (err) {
    console.log(`清理目录失败: ${utils.chalk.cyan(outputPath.replace(cwd, ''))}`)
  }
}

function buildAfter(outputPath, stats) {
  console.log('File sizes after gzip:\n')
  FileSizeReporter.printFileSizesAfterBuild(
    stats,
    {
      root: outputPath,
      sizes: {}
    },
    outputPath,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  )
  console.log()
}

function bundler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        try {
          console.log(stats.toString('errors-only'))
        } catch (e) {}

        console.error(err)
        return reject(new Error('build failed'))
      }

      resolve({
        stats
      })
    })
  })
}

function build(_x, _x2) {
  return _build.apply(this, arguments)
}

function _build() {
  _build = _asyncToGenerator(function*(webpackConfig, cwd) {
    try {
      const outputPath = webpackConfig.output.path
      clearOutput(outputPath, cwd)
      const result = yield bundler(webpackConfig)
      buildAfter(outputPath, result.stats)
    } catch (error) {
      console.log(error)
    }
  })
  return _build.apply(this, arguments)
}

exports.default = build
