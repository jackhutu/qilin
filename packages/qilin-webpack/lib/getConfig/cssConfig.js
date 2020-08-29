'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }

  return obj
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
      })
    }
  }

  return target
}

const deepmerge = require('deepmerge')

function createCSSRule({ webpackConfig, config, env, lang, test, loader, options }) {
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
      .options(
        _objectSpread2(
          {
            importLoaders: 1
          },
          isCSSModules
            ? {
                modules: {
                  localIdentName: '[local]___[hash:base64:5]'
                }
              }
            : {}
        )
      )
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

function handelCssConfig(webpackConfig, opts) {
  const config = opts.config,
    _opts$config$lessVars = opts.config.lessVars,
    lessVars = _opts$config$lessVars === void 0 ? {} : _opts$config$lessVars,
    env = opts.env,
    cwd = opts.cwd
  createCSSRule({
    webpackConfig,
    config,
    env,
    lang: 'css',
    test: /\.css$/
  }) // less

  createCSSRule({
    webpackConfig,
    config,
    env,
    lang: 'less',
    test: /\.less$/,
    loader: 'less-loader',
    options: {
      modifyVars: lessVars,
      javascriptEnabled: true
    }
  })
  return webpackConfig
}

exports.default = handelCssConfig
