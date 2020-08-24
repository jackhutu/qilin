import path from 'path'
import fs from 'fs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
const progress = require(`rollup-plugin-progress`)
import json from '@rollup/plugin-json'
// import alias from '@rollup/plugin-alias'

const pkg = require('./package.json')
const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
const externalPeerDeps = Object.keys(pkg.peerDependencies || {})

function getPkgNameByid(id) {
  const splitted = id.split('/')
  return splitted[0]
}
function testExternal(pkgs, id) {
  return pkgs.includes(getPkgNameByid(id))
}

const resolveFile = function(filePath) {
  return path.join(__dirname, './', filePath)
}

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs']
const tsconfigOverride = {
  compilerOptions: {
    sourceMap: false,
    // inlineSourceMap: false,
    declarationMap: false,
    // noEmitHelpers: false, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    // importHelpers: false, // 通过tslib引入helper函数，文件必须是模块
    target: 'esnext',
    declaration: true,
    declarationDir: './lib'
  }
}
const terserOpts = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false
  }
}

const plugins = [
  clear({
    targets: ['./lib']
  }),
  nodeResolve({
    mainFields: [`module`, `main`],
    extensions: extensions,
    preferBuiltins: false
  }),
  typescript({
    tsconfigOverride,
    useTsconfigDeclarationDir: true
  }),
  babel({
    babelHelpers: 'bundled',
    extensions: extensions,
    babelrc: false,
    exclude: /node_modules/,
    presets: [['@babel/preset-env', { modules: 'auto', targets: { node: 6 } }]],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-do-expressions',
      ['@babel/proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  }),
  filesize(),
  json(),
  progress({
    clearLine: false
  })
]
const configs = []

const scripts = fs.readdirSync('./src')
scripts.map(file => {
  const filename = path.basename(file, '.ts')
  configs.push({
    input: resolveFile('src/' + file),
    output: [
      {
        file: resolveFile('lib/' + filename + '.js'),
        format: 'cjs',
        exports: 'named'
      }
    ],
    plugins,
    external
  })
})

module.exports = configs
