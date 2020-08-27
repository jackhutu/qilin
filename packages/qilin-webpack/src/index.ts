import { join } from 'path'
import { existsSync } from 'fs'
import assert from 'assert'
import getConfig from './getConfig'
import devServer from './dev'
import buildServer from './build'
import getUserConfig from './getConfig/userConfig'
import { getDefaultConfig, ENTRY_FILES } from './getConfig/defaultConfig'
import { UserConfig, QilinWebpackConfig } from './types'
import { winPath } from '@qilinjs/utils'
interface QilinOpts {
  cwd?: string
  pkg?: Object
  args?: Object
}

export default class QilinWebpack {
  cwd: string
  pkg: Object
  args: Object
  config: UserConfig
  constructor(ops: QilinOpts = {}) {
    this.cwd = ops.cwd || process.cwd()
    this.pkg = ops.pkg || {}
    this.args = ops.args || {}
    this.init()
  }

  init() {
    const userConfig = getUserConfig(this.cwd)
    const defaultConfig = getDefaultConfig()
    this.config = { ...defaultConfig, ...userConfig }
    // contentBase 默认, 无需配置
    this.config['contentBase'] = [join(this.cwd, './src'), this.cwd]
  }

  getEntry() {
    const entryFile = ENTRY_FILES.find(f => existsSync(join(this.cwd, f)))
    return entryFile ? winPath(entryFile) : null
  }

  getOpts(env: 'development' | 'production' = 'development') {
    const bundle = join(this.cwd, this.getEntry())
    assert(bundle, `Can't find the default entry.`)
    if (!bundle) return
    const opts: QilinWebpackConfig = {
      cwd: this.cwd,
      env,
      entry: {
        bundle
      },
      config: this.config
    }
    return opts
  }

  async dev() {
    try {
      const webpackConfig = await getConfig(this.getOpts())
      await devServer(webpackConfig, this.config)
    } catch (err) {
      console.log(err)
    }
  }

  async build() {
    try {
      const webpackConfig = await getConfig(this.getOpts('production'))
      await buildServer(webpackConfig, this.cwd)
    } catch (err) {
      console.log(err)
    }
  }
}
