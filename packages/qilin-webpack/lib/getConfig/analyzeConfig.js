'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function handelAnalyzeConfig(webpackConfig, opts) {
  const config = opts.config
  webpackConfig
    .plugin('bundle-analyzer')
    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
      (config === null || config === void 0 ? void 0 : config.analyze) || {}
    ])
  return webpackConfig
}

exports.default = handelAnalyzeConfig
