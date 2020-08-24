'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var fs = require('fs')
var webpack = _interopDefault(require('webpack'))
var WebpackDevServer = _interopDefault(require('webpack-dev-server'))
var getPort = _interopDefault(require('./getPort'))
var utils = require('@qilin/utils')
var openBrowser = _interopDefault(require('react-dev-utils/openBrowser'))

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

const deepmerge = require('deepmerge')
const HOST = process.env.HOST || '0.0.0.0'
const PROTOCOL = process.env.HTTPS ? 'https' : 'http'
const CERT = process.env.HTTPS && process.env.CERT ? fs.readFileSync(process.env.CERT) : ''
const KEY = process.env.HTTPS && process.env.KEY ? fs.readFileSync(process.env.KEY) : ''
process.env.NODE_ENV = 'development'
const isInteractive = process.stdout.isTTY
function dev(_x, _x2) {
  return _dev.apply(this, arguments)
}

function _dev() {
  _dev = _asyncToGenerator(function*(webpackConfig, config) {
    try {
      const port = yield getPort()
      if (port === null) return
      const compiler = webpack(webpackConfig)
      const proxy = config.proxy || {}
      let serverConfig = {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'none',
        hot: true,
        quiet: true,
        headers: {
          'access-control-allow-origin': '*'
        },
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
          ignored: /node_modules/
        },
        historyApiFallback: true,
        overlay: false,
        host: HOST,
        proxy,
        https: !!process.env.HTTPS,
        cert: CERT,
        key: KEY
      }
      if (config.contentBase) serverConfig['contentBase'] = config.contentBase
      if (config.devServer) serverConfig = deepmerge(serverConfig, config.devServer)
      let isFirstCompile = true
      compiler.hooks.done.tap('qilin-webpack dev', stats => {
        if (stats.hasErrors()) {
          // make sound
          process.stdout.write('\x07')
          return
        }

        const localIp = utils.address.ip()
        const hostname = HOST === '0.0.0.0' ? 'localhost' : HOST
        const localUrl = `${PROTOCOL}://${hostname}:${port}`
        const ipUrl = `${PROTOCOL}://${localIp}:${port}`

        if (isFirstCompile) {
          console.log()
          console.log(
            [
              `  App running at:`,
              `  - Local:   ${utils.chalk.cyan(localUrl)}`,
              `  - Network: ${utils.chalk.cyan(ipUrl)}`
            ].join('\n')
          )
          console.log()
        }

        if (isFirstCompile) {
          var _process$send, _process

          isFirstCompile = false
          ;(_process$send = (_process = process).send) === null || _process$send === void 0
            ? void 0
            : _process$send.call(_process, {
                type: 'DONE'
              })
          openBrowser(localUrl)
        }
      })
      const server = new WebpackDevServer(compiler, serverConfig)
      server.listen(port, HOST, err => {
        var _process$send2, _process2

        if (err) {
          console.log(err)
          return
        }

        if (isInteractive) utils.clearConsole()
        console.log(utils.chalk.cyan('Starting the development server...\n'))
        ;(_process$send2 = (_process2 = process).send) === null || _process$send2 === void 0
          ? void 0
          : _process$send2.call(_process2, {
              type: 'STARTING'
            })
      })
    } catch (err) {
      console.log(err)
    }
  })
  return _dev.apply(this, arguments)
}

exports.default = dev
