'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var defaultConfig = require('./defaultConfig')
var fs = require('fs')
var path = require('path')
var utils = require('@qilinjs/utils')

function getConfigFile(cwd) {
  const configFile = defaultConfig.CONFIG_FILES.find(f => fs.existsSync(path.join(cwd, f)))
  return configFile ? utils.winPath(configFile) : null
}

function compatESModuleRequire(m) {
  return m.__esModule ? m.default : m
}

var userConfig = cwd => {
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

    configFile = path.join(cwd, configFile)
    userConfig = compatESModuleRequire(require(configFile))
  }

  return userConfig
}

exports.default = userConfig
