'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var path = require('path')
var fs = require('fs')
var defaultConfig = require('./defaultConfig')
var utils = require('@qilin/utils')

function getHtmlTplFile(cwd, config) {
  const contentBase = config.contentBase
  let contentBaseFiles = []

  if (contentBase) {
    if (Array.isArray(contentBase)) {
      contentBaseFiles = [...contentBase]
    }

    if (typeof contentBase === 'string') {
      contentBaseFiles.push(contentBase)
    }

    contentBaseFiles.map(basePath => {
      if (path.isAbsolute(basePath)) {
        defaultConfig.HTML_FILES.unshift(path.join(basePath, 'index.html'), path.join(basePath, 'index.ejs'))
      } else {
        defaultConfig.HTML_FILES.unshift(path.join(cwd, basePath, 'index.html'), path.join(cwd, basePath, 'index.ejs'))
      }
    })
  }

  const configFile = defaultConfig.HTML_FILES.find(f => fs.existsSync(path.isAbsolute(f) ? f : path.join(cwd, f)))
  return configFile ? utils.winPath(configFile) : null
}

var htmlConfig = opts => {
  const cwd = opts.cwd,
    config = opts.config
  const template = getHtmlTplFile(cwd, config)
  if (!config.htmlWebpack['template']) config.htmlWebpack['template'] = template
  return config.htmlWebpack
}

exports.default = htmlConfig
