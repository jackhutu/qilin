import { QilinWebpackConfig, UserConfig } from '../types'
import { join, isAbsolute } from 'path'
import { existsSync } from 'fs'
import { HTML_FILES } from './defaultConfig'
import { winPath } from '@qilinjs/utils'

function getHtmlTplFile(cwd: string, config: UserConfig): string | null {
  const { contentBase } = config
  let contentBaseFiles = []
  if (contentBase) {
    if (Array.isArray(contentBase)) {
      contentBaseFiles = [...contentBase]
    }

    if (typeof contentBase === 'string') {
      contentBaseFiles.push(contentBase)
    }
    contentBaseFiles.map(basePath => {
      if (isAbsolute(basePath)) {
        HTML_FILES.unshift(join(basePath, 'index.html'), join(basePath, 'index.ejs'))
      } else {
        HTML_FILES.unshift(join(cwd, basePath, 'index.html'), join(cwd, basePath, 'index.ejs'))
      }
    })
  }
  const configFile = HTML_FILES.find(f => existsSync(isAbsolute(f) ? f : join(cwd, f)))
  return configFile ? winPath(configFile) : null
}

export default (opts: QilinWebpackConfig) => {
  const { cwd, config } = opts
  const template = getHtmlTplFile(cwd, config)

  if (!config.htmlWebpack['template']) config.htmlWebpack['template'] = template

  return config.htmlWebpack
}
