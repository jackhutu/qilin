import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
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
  postcssLoader?: object
  theme?: object
  browsers?: string[]
  extraPostCSSPlugins?: any[]
  proxy?: any
  contentBase?: string[] | string | boolean
  devServer?: object
  htmlWebpack?: Object
  analyze?: BundleAnalyzerPlugin.Options
  useAntd?: boolean
  splitChunks?: webpack.Options.SplitChunksOptions
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
