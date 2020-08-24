import webpack from 'webpack'
import Config from 'webpack-chain'
import handleBaseConfig from './baseConfig'
import handleDevConfig from './devConfig'
import handleProdConfig from './prodConfig'
import handleCssConfig from './cssConfig'
import handleAnalyzeConfig from './analyzeConfig'
import { QilinWebpackConfig } from '../types'
import { join } from 'path'

export default async function getConfig(opts: QilinWebpackConfig): Promise<webpack.Configuration> {
  const { env, entry, cwd, config } = opts
  let webpackConfig = new Config()
  const absOutputPath = join(cwd, config.outputPath || 'dist')
  opts.absOutputPath = absOutputPath

  webpackConfig.mode(env)
  // entry
  if (entry) {
    Object.keys(entry).forEach(key => {
      webpackConfig.entry(key).add(entry[key])
    })
  }
  // output
  webpackConfig.output.path(absOutputPath).publicPath((config.publicPath! as unknown) as string)

  handleBaseConfig(webpackConfig, opts)

  if (env === 'development') handleDevConfig(webpackConfig, opts)

  if (env === 'production') handleProdConfig(webpackConfig, opts)

  handleCssConfig(webpackConfig, opts)

  if (process.env.ANALYZE) handleAnalyzeConfig(webpackConfig, opts)

  const result = webpackConfig.toConfig() as webpack.Configuration

  return result
}
