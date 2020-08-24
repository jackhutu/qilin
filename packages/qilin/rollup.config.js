import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
const progress = require(`rollup-plugin-progress`)

const resolveFile = function(filePath) {
  return path.join(__dirname, './', filePath)
}
const env = process.env.NODE_ENV
const isProduction = env === `production`
const EXTENSIONS = [`.ts`, `.tsx`, `.js`, `.jsx`, `.es6`, `.es`, `.mjs`]
const sourcemap = env === 'development' ? 'inline' : false
const external = [
  'react',
  'react-dom',
  'react-redux',
  'redux'
  // 'immer',
  // 'redux-saga',
  // 'redux-saga/effects'
]

const tsconfigOverride = {
  compilerOptions: {
    // sourceMap: !isProduction,
    inlineSourceMap: !isProduction
    // declarationDir: './dist'
  }
}
const plugins = [
  clear({
    targets: ['./dist']
  }),
  nodeResolve({
    mainFields: [`module`, `main`],
    browser: true,
    extensions: EXTENSIONS
  }),
  typescript({
    tsconfigOverride,
    useTsconfigDeclarationDir: true
  }),
  commonjs({
    include: /node_modules/
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(isProduction ? `production` : `development`)
  }),
  babel({
    extensions: EXTENSIONS,
    babelrc: false,
    babelHelpers: 'bundled',
    exclude: /node_modules/,
    presets: ['@babel/preset-env'],
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread', 'babel-plugin-dev-expression']
  }),
  filesize(),
  progress({
    clearLine: false
  }),
  isProduction && terser()
]
const configs = []
const qilinConfig = {
  input: resolveFile('src/index.ts'),
  output: [
    {
      file: resolveFile('dist/index.js'),
      format: 'cjs',
      sourcemap,
      exports: 'named'
    },
    {
      file: resolveFile('dist/index.esm.js'),
      format: 'es',
      sourcemap
    }
  ],
  external,
  plugins
}
configs.push(qilinConfig)

module.exports = configs
