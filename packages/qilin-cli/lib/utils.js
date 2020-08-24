'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var path = require('path')

const getCwd = (opts = {}) => {
  let cwd = opts.cwd || process.env.APP_ROOT || process.cwd()

  if (!path.isAbsolute(cwd)) {
    return path.join(process.cwd(), process.env.APP_ROOT)
  }

  return cwd
}
const getPkg = dir => {
  let pkgDir = dir || getCwd()

  if (!path.isAbsolute(pkgDir)) {
    pkgDir = path.join(getCwd(), pkgDir)
  }

  try {
    return require(path.join(pkgDir, 'package.json'))
  } catch (error) {
    return null
  }
}

exports.getCwd = getCwd
exports.getPkg = getPkg
