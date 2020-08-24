'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var path = require('path')
var fs = require('fs')
var assert = _interopDefault(require('assert'))
var getConfig = _interopDefault(require('./getConfig'))
var devServer = _interopDefault(require('./dev'))
var buildServer = _interopDefault(require('./build'))
var getUserConfig = _interopDefault(require('./getConfig/userConfig'))
var defaultConfig = require('./getConfig/defaultConfig')
var utils = require('@qilinjs/utils')

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

class QilinWebpack {
  constructor(ops = {}) {
    this.cwd = ops.cwd || process.cwd()
    this.pkg = ops.pkg || {}
    this.args = ops.args || {}
    this.init()
  }

  init() {
    const userConfig = getUserConfig(this.cwd)
    const defaultConfig$1 = defaultConfig.getDefaultConfig()
    this.config = _objectSpread2(_objectSpread2({}, defaultConfig$1), userConfig)
  }

  getEntry() {
    const entryFile = defaultConfig.ENTRY_FILES.find(f => fs.existsSync(path.join(this.cwd, f)))
    return entryFile ? utils.winPath(entryFile) : null
  }

  getOpts(env = 'development') {
    const bundle = path.join(this.cwd, this.getEntry())
    assert(bundle, `Can't find the default entry.`)
    if (!bundle) return
    const opts = {
      cwd: this.cwd,
      env,
      entry: {
        bundle
      },
      config: this.config
    }
    return opts
  }

  dev() {
    var _this = this

    return _asyncToGenerator(function*() {
      try {
        const webpackConfig = yield getConfig(_this.getOpts())
        yield devServer(webpackConfig, _this.config)
      } catch (err) {
        console.log(err)
      }
    })()
  }

  build() {
    var _this2 = this

    return _asyncToGenerator(function*() {
      try {
        const webpackConfig = yield getConfig(_this2.getOpts('production'))
        yield buildServer(webpackConfig, _this2.cwd)
      } catch (err) {
        console.log(err)
      }
    })()
  }
}

exports.default = QilinWebpack
