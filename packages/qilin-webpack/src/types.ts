import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

type IBabelOptions = Function | string | [string, any, string?]
export interface UserConfig {
  devtool?: webpack.Options.Devtool
  outputPath?: string
  publicPath?: string
  alias?: {
    [key: string]: string
  }
  define?: {
    [key: string]: any
  }
  copy?: string[]
  terserOptions?: object
  inlineLimit?: number
  externals?: any
  postcssLoaderOptions?: object //暂不配置
  theme?: object
  browsers?: string[]
  postcssPlugins?: any[]
  proxy?: any
  contentBase?: string[] | string | boolean // 取消配置
  devServer?: object
  htmlWebpack?: Object
  analyze?: BundleAnalyzerPlugin.Options
  useAntd?: boolean
  splitChunks?: webpack.Options.SplitChunksOptions
  babelPlugins?: IBabelOptions[]
  babelPresets?: IBabelOptions[]
}

export interface QilinWebpackConfig {
  config: UserConfig
  cwd: string
  env: 'development' | 'production'
  entry?: {
    [key: string]: string
  }
  absOutputPath?: string
}
