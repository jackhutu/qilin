import { UserConfig } from '../types'
export const browserslist = ['last 2 version', '> 1%', 'iOS >= 8', 'Android >= 4']
export const CONFIG_FILES = ['.qilinrc.ts', '.qilinrc.js', 'config/config.ts', 'config/config.js']
export const ENTRY_FILES = ['./src/index.tsx', './src/index.ts', './src/index.jsx', './src/index.js']

export const HTML_FILES = ['./src/index.html', './src/index.ejs', 'index.html', 'index.ejs']

export const getDefaultConfig = (): UserConfig => {
  return {
    browsers: browserslist,
    outputPath: 'dist',
    copy: [],
    publicPath: '/',
    htmlWebpack: {
      inject: 'body',
      hash: false, //为静态资源生成hash值
      minify: {
        //压缩HTML文件
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
      base: '/'
    },
    useAntd: true
  }
}
