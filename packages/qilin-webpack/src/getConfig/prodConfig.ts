import Config from 'webpack-chain'
import { QilinWebpackConfig } from '../types'
const deepmerge = require('deepmerge')
import terserOptions from './terserOptions'

export default function handelProdConfig(webpackConfig: Config, opts: QilinWebpackConfig): Config {
  const { config } = opts

  webpackConfig.output.filename(`js/[name].[contenthash:8].js`).chunkFilename(`js/[name].[chunkhash:8].js`)

  // mini-css-extract plugin
  webpackConfig.plugin('mini-css-extract').use(require.resolve('mini-css-extract-plugin'), [
    {
      filename: 'css/[name].[contenthash:8].style.css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      ignoreOrder: true
    }
  ])
  // optimization
  // don't emit files if have error
  webpackConfig.optimization.noEmitOnErrors(true)
  // don't show hints when size is too large
  webpackConfig.performance.hints(false)
  webpackConfig.optimization.minimizer('terser').use(require.resolve('terser-webpack-plugin'), [
    {
      terserOptions: deepmerge(terserOptions, config.terserOptions || {}),
      sourceMap: config.devtool !== false,
      cache: true,
      parallel: true,
      extractComments: false
    }
  ])
  webpackConfig.optimization.minimizer('css').use(require.resolve('optimize-css-assets-webpack-plugin'), [{}])

  webpackConfig.optimization.splitChunks({
    // chunks: 'all', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
    // minSize: 20000, // 最小尺寸，20000
    // minChunks: 1, // 最小 chunk , 默认1
    // maxAsyncRequests: 30, // 最大异步请求数， 默认5
    // maxInitialRequests: 30, // 最大初始化请求书，默认3
    automaticNameDelimiter: '.',
    ...(config.splitChunks ? config.splitChunks : {})
  })
  return webpackConfig
}
