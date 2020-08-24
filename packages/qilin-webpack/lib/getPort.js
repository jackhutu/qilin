'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

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

const portfinder = require('portfinder')

var getPort = /*#__PURE__*/ (function() {
  var _ref = _asyncToGenerator(function*(port) {
    if (port) return port

    if (process.env.PORT) {
      return parseInt(process.env.PORT, 10)
    }

    portfinder.basePort = 8000
    portfinder.highestPort = 9000
    return portfinder.getPortPromise()
  })

  return function(_x) {
    return _ref.apply(this, arguments)
  }
})()

exports.default = getPort
