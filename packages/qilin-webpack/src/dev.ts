import { readFileSync } from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import getPort from './getPort'
const deepmerge = require('deepmerge')
import { clearConsole, chalk, address } from '@qilinjs/utils'
import openBrowser from 'react-dev-utils/openBrowser'

const HOST = process.env.HOST || '0.0.0.0'
const PROTOCOL = process.env.HTTPS ? 'https' : 'http'
const CERT = process.env.HTTPS && process.env.CERT ? readFileSync(process.env.CERT) : ''
const KEY = process.env.HTTPS && process.env.KEY ? readFileSync(process.env.KEY) : ''
process.env.NODE_ENV = 'development'
const isInteractive = process.stdout.isTTY

export default async function dev(webpackConfig, config) {
  try {
    const port = await getPort()
    if (port === null) return
    const compiler = webpack(webpackConfig)
    const proxy = config.proxy || {}
    let serverConfig = {
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      quiet: true,
      headers: {
        'access-control-allow-origin': '*'
      },
      publicPath: webpackConfig.output.publicPath,
      watchOptions: {
        ignored: /node_modules/
      },
      historyApiFallback: true,
      overlay: false,
      host: HOST,
      proxy,
      https: !!process.env.HTTPS,
      cert: CERT,
      key: KEY
    }
    if (config.contentBase) serverConfig['contentBase'] = config.contentBase
    if (config.devServer) serverConfig = deepmerge(serverConfig, config.devServer)

    let isFirstCompile = true
    compiler.hooks.done.tap('qilin-webpack dev', stats => {
      if (stats.hasErrors()) {
        // make sound
        process.stdout.write('\x07')
        return
      }

      const localIp = address.ip()
      const hostname = HOST === '0.0.0.0' ? 'localhost' : HOST
      const localUrl = `${PROTOCOL}://${hostname}:${port}`
      const ipUrl = `${PROTOCOL}://${localIp}:${port}`

      if (isFirstCompile) {
        console.log()
        console.log(
          [`  App running at:`, `  - Local:   ${chalk.cyan(localUrl)}`, `  - Network: ${chalk.cyan(ipUrl)}`].join('\n')
        )
        console.log()
      }

      if (isFirstCompile) {
        isFirstCompile = false
        process.send?.({ type: 'DONE' })
        openBrowser(localUrl)
      }
    })
    const server = new WebpackDevServer(compiler, serverConfig)
    server.listen(port, HOST, err => {
      if (err) {
        console.log(err)
        return
      }
      if (isInteractive) clearConsole()
      console.log(chalk.cyan('Starting the development server...\n'))
      process.send?.({ type: 'STARTING' })
    })
  } catch (err) {
    console.log(err)
  }
}
