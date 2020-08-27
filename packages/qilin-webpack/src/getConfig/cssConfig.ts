import Config from 'webpack-chain'
import { QilinWebpackConfig, UserConfig } from '../types'
const deepmerge = require('deepmerge')

interface createCSSRuleParams {
  webpackConfig: Config
  config: UserConfig
  env: string
  lang: string
  test: RegExp
  loader?: string
  options?: object
}

function createCSSRule({ webpackConfig, config, env, lang, test, loader, options }: createCSSRuleParams) {
  const rule = webpackConfig.module.rule(lang).test(test)

  applyLoaders(rule.oneOf('css-modules').resourceQuery(/modules/), true)
  applyLoaders(rule.oneOf('css'), false)

  function applyLoaders(rule, isCSSModules) {
    rule
      .use('extract-css-loader')
      .loader(require.resolve('mini-css-extract-plugin/dist/loader'))
      .options({
        publicPath: './',
        hmr: env === 'development'
      })
    rule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        importLoaders: 1,
        ...(isCSSModules
          ? {
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              }
            }
          : {})
      })

    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options(
        deepmerge(
          {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                browsers: config.browsers || [],
                stage: 3
              }),
              ...(config.postcssPlugins || [])
            ]
          },
          config.postcssLoaderOptions || {}
        )
      )

    if (loader) {
      rule
        .use(loader)
        .loader(require.resolve(loader))
        .options(options || {})
    }
  }
}

export default function handelCssConfig(webpackConfig: Config, opts: QilinWebpackConfig): Config {
  const {
    config,
    config: { theme = {} },
    env,
    cwd
  } = opts
  createCSSRule({
    webpackConfig,
    config,
    env,
    lang: 'css',
    test: /\.css$/
  })

  // less
  createCSSRule({
    webpackConfig,
    config,
    env,
    lang: 'less',
    test: /\.less$/,
    loader: 'less-loader',
    options: {
      modifyVars: theme,
      javascriptEnabled: true
    }
  })

  return webpackConfig
}
