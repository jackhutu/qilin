'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function getBabelOpts(opts) {
  const env = opts.env,
    config = opts.config
  const babelConfig = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 2,
          modules: false
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
      ...(config.babelPresets || [])
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      '@babel/plugin-syntax-object-rest-spread',
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false
        }
      ],
      'babel-plugin-auto-css-modules-flag',
      ...(config.useAntd
        ? [
            [
              'babel-plugin-import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true // `style: true` 会加载 less 文件, 'css' 只加载css
              }
            ]
          ]
        : []),
      '@babel/plugin-syntax-dynamic-import',
      ...(config.babelPlugins || [])
    ],
    comments: false
  }

  if (env === 'development') {
    babelConfig['env'] = {
      development: {
        plugins: ['react-hot-loader/babel']
      }
    }
  }

  return babelConfig
}

exports.default = getBabelOpts
