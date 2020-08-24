import yParser from 'yargs-parser'
import QilinWebpack from '@qilin/webpack'
const args = yParser(process.argv.slice(2))

const { getCwd, getPkg } = require('./utils')
const cwd = getCwd(args)
const pkg = getPkg()

const qilinWebpack = new QilinWebpack({
  cwd,
  pkg,
  args
})

qilinWebpack.build()
