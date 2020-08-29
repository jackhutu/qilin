# 构建

Qilin 基于 webpack, 以下为 webpack 的相关配置, 配置文件约定为项目根目录下`.qilinrc.ts`文件

## outputPath

- Type: `string`
- Default: `dist`

输出路径

## publicPath

- Type: `string`
- Default: `/`

webpack 的 publicPath

## alias

- Type: `object`
- Default: `{}`
  配置别名

```
alias: {
  pages: path.join(__dirname, './src/pages')
},
```

## define

- Type: `object`
- Default: `{}`
  定义代码可以使用的变量, 打包时会替换掉

```
define: {
  __DEVTOOLS__: false,
  __DEVLOGGER__: false
},
```

## copy

- Type: `Array(string|object)`
- Default: `['public']`
  配置复制到输出目录下的文件, 可以是字符串, 也可以是带有 from, to 字段的对象, 默认会复制项目根目录下的 public 文件夹中的文件

```
  copy:[
    'copyDir',
    { from: path.join(__dirname, './src/copy'), to: path.join(__dirname, './dist/copy') }
  ],
```

## inlineLimit

- Type: `number`
- Default: `10000 (10k)`
  配置图片文件是否使用 base64 编译的文件大小阀值

## externals

- Type: `object`
- Default: `{}`
  不被打包的模块

## lessVars

- Type: `object`
- Default: `{}`
  配置 less 变量

## browsers

- Type: `array`
- Default: `['last 2 version', '> 1%', 'iOS >= 8', 'Android >= 4']`
  配置浏览器兼容性

## postcssPlugins

- Type: `array`
- Default: `[]`
  配置 postcss 插件

已使用的插件如下

```
postcss-flexbugs-fixes
postcss-preset-env
```

## htmlWebpack

- Type: `object`
- Default: `{}`
  配置 html-webpack-plugin 插件选项

## babelPresets

- Type: `array`
- Default: `[]`
  配置 babel preset 项

## babelPlugins

- Type: `array`
- Default: `[]`
  配置 babel 插件

## proxy

- Type: `object`
- Default: `{}`
  配置 webpack-dev-server 代理

## devServer

- Type: `object`
- Default: `{}`
  配置 webpack-dev-server 选项

## analyze

- Type: `object`
- Default: `{}`
  配置 webpack-bundle-analyzer 插件选项

## splitChunks

- Type: `object`
- Default: `{}`
  webpack optimization splitChunks 配置
