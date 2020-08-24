'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var yParser = _interopDefault(require('yargs-parser'))
var QilinWebpack = _interopDefault(require('@qilinjs/webpack'))

const args = yParser(process.argv.slice(2)) // 提供给具体处理程序的参数

const _require = require('./utils'),
  getCwd = _require.getCwd,
  getPkg = _require.getPkg

const cwd = getCwd(args)
const pkg = getPkg()
const qilinWebpack = new QilinWebpack({
  cwd,
  pkg,
  args
})
qilinWebpack.dev()
