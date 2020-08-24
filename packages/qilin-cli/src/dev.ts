import yParser from 'yargs-parser'
import QilinWebpack from '@qilinjs/webpack'
const args = yParser(process.argv.slice(2))

// 提供给具体处理程序的参数
const { getCwd, getPkg } = require('./utils')
const cwd = getCwd(args)
const pkg = getPkg()

const qilinWebpack = new QilinWebpack({
  cwd,
  pkg,
  args
})

qilinWebpack.dev()
