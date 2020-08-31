import Config from 'webpack-chain'
import { QilinWebpackConfig } from '../types'
import webpack from 'webpack'

export default function handelDevConfig(webpackConfig: Config, opts: QilinWebpackConfig): Config {
  const { config } = opts
  // devtool
  const devtool = config.devtool as Config.DevTool
  webpackConfig.devtool(devtool || 'cheap-module-source-map')

  webpackConfig.output.filename(`js/[name].js`).chunkFilename(`js/[id].js`)
  // mini-css-extract plugin
  webpackConfig.plugin('mini-css-extract').use(require.resolve('mini-css-extract-plugin'), [
    {
      filename: 'css/[name].style.css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: true
    }
  ])
  // hmr
  webpackConfig.plugin('hmr').use(webpack.HotModuleReplacementPlugin)

  // devServer
  return webpackConfig
}
