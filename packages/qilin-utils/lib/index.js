'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var address = _interopDefault(require('address'))
var chalk = _interopDefault(require('chalk'))

function winPath(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}
function clearConsole() {
  const { CLEAR_CONSOLE = 'none' } = process.env

  if (CLEAR_CONSOLE !== 'none') {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')
  }
}
const isArray = Array.isArray.bind(Array)
const isFunction = o => typeof o === 'function'

exports.address = address
exports.chalk = chalk
exports.clearConsole = clearConsole
exports.isArray = isArray
exports.isFunction = isFunction
exports.winPath = winPath
