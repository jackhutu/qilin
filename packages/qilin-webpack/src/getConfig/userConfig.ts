import { CONFIG_FILES } from './defaultConfig'
import { existsSync } from 'fs'
import { join } from 'path'
import { winPath } from '@qilinjs/utils'

function getConfigFile(cwd: string): string | null {
  const configFile = CONFIG_FILES.find(f => existsSync(join(cwd, f)))
  return configFile ? winPath(configFile) : null
}

function compatESModuleRequire(m) {
  return m.__esModule ? m.default : m
}

export default (cwd: string) => {
  let configFile = getConfigFile(cwd)

  let userConfig = {}
  if (configFile) {
    require('@babel/register')({
      presets: [require.resolve('@babel/preset-env')],
      ignore: [/node_modules/],
      extensions: ['.jsx', '.js', '.ts', '.tsx'],
      babelrc: false,
      cache: false
    })
    configFile = join(cwd, configFile)
    userConfig = compatESModuleRequire(require(configFile))
  }
  return userConfig
}
