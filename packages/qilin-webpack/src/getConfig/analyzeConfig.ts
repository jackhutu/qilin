import Config from 'webpack-chain'
import { QilinWebpackConfig } from '../types'

export default function handelAnalyzeConfig(webpackConfig: Config, opts: QilinWebpackConfig): Config {
  const { config } = opts
  webpackConfig
    .plugin('bundle-analyzer')
    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [config?.analyze || {}])

  return webpackConfig
}
