import webpack from 'webpack'
import { existsSync } from 'fs'
import Config from 'webpack-chain'
import { QilinWebpackConfig } from '../types'
import getBabelOpts from './babelOpts'
import { join, relative, dirname, resolve } from 'path'
import getHtmlConfig from './htmlConfig'
import { chalk } from '@qilinjs/utils'

export default function handelBaseConfig(webpackConfig: Config, opts: QilinWebpackConfig): Config {
  const { env, cwd, config, absOutputPath } = opts
  //resolve
  webpackConfig.resolve.modules
    .add('node_modules')
    .add(join(__dirname, '../../node_modules'))
    .end()
    .extensions.merge([
      '.web.js',
      '.wasm',
      '.mjs',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json'
    ])
  if (config.alias) {
    Object.keys(config.alias).forEach(key => {
      webpackConfig.resolve.alias.set(key, config.alias![key])
    })
  }

  const htmlConfig = getHtmlConfig(opts)
  console.log(`use html template:   ${chalk.cyan(htmlConfig['template'].replace(cwd, ''))}`)
  // plugins
  webpackConfig.plugin('html-webpack-plugin').use(require.resolve('html-webpack-plugin'), [htmlConfig])

  if (config.useAntd) {
    webpackConfig.plugin('antd-dayjs').use(require.resolve('antd-dayjs-webpack-plugin'))
  }

  // define plugin
  let define = config.define || {}
  webpackConfig.plugin('define').use(webpack.DefinePlugin, [{ ...define }])

  // progress
  webpackConfig.plugin('progress').use(require.resolve('webpackbar'), [{}])

  let copyFiles = config.copy || []
  let copyResultFiles = copyFiles.map(item => {
    return typeof item === 'string'
      ? {
          from: join(cwd, item),
          to: absOutputPath
        }
      : item
  })
  // copy
  webpackConfig.plugin('copy').use(require.resolve('copy-webpack-plugin'), [
    [
      existsSync(join(cwd, 'public')) && {
        from: join(cwd, 'public'),
        to: absOutputPath
      },
      ...copyResultFiles
    ].filter(Boolean)
  ])
  // error handle
  webpackConfig.plugin('friendly-error').use(require.resolve('friendly-errors-webpack-plugin'), [
    {
      clearConsole: false
    }
  ])
  // manifest
  const babelOpts = getBabelOpts(opts)
  // module rule
  webpackConfig.module
    .rule('js')
    .test(/\.(js|mjs|jsx|ts|tsx)$/)
    .include.add(cwd)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use('cache-loader')
    .loader(require.resolve('cache-loader'))
    .end()
    .use('thread-loader')
    .loader(require.resolve('thread-loader'))
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOpts)

  webpackConfig.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: config.inlineLimit || 10000,
      name: 'images/[name].[hash:8].[ext]',
      esModule: false
    })

  webpackConfig.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false
    })

  webpackConfig.module
    .rule('fonts')
    .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false
    })

  webpackConfig.module
    .rule('plaintext')
    .test(/\.(txt|text|md)$/)
    .use('raw-loader')
    .loader(require.resolve('raw-loader'))

  // externals
  if (config.externals) {
    webpackConfig.externals(config.externals)
  }
  // node shims
  webpackConfig.node.merge({
    setImmediate: false,
    module: 'empty',
    dns: 'mock',
    http2: 'empty',
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  })
  return webpackConfig
}
