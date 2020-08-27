'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const browserslist = ['last 2 version', '> 1%', 'iOS >= 8', 'Android >= 4']
const CONFIG_FILES = ['.qilinrc.ts', '.qilinrc.js', 'config/config.ts', 'config/config.js']
const ENTRY_FILES = ['./src/index.tsx', './src/index.ts', './src/index.jsx', './src/index.js']
const HTML_FILES = ['./src/index.html', './src/index.ejs', 'index.html', 'index.ejs']
const getDefaultConfig = () => {
  return {
    browsers: browserslist,
    outputPath: 'dist',
    copy: [],
    publicPath: '/',
    htmlWebpack: {
      inject: 'body',
      hash: false,
      minify: {
        //压缩HTML文件
        removeComments: false,
        collapseWhitespace: false //删除空白符与换行符
      },
      base: '/'
    },
    useAntd: true
  }
}

exports.CONFIG_FILES = CONFIG_FILES
exports.ENTRY_FILES = ENTRY_FILES
exports.HTML_FILES = HTML_FILES
exports.browserslist = browserslist
exports.getDefaultConfig = getDefaultConfig
