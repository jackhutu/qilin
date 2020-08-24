import webpack from 'webpack'
import { printFileSizesAfterBuild } from 'react-dev-utils/FileSizeReporter'
import rimraf from 'rimraf'
import { chalk } from '@qilin/utils'

process.env.NODE_ENV = 'production'
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

function clearOutput(outputPath, cwd) {
  try {
    console.log(`清理目录: ${chalk.cyan(outputPath.replace(cwd, ''))}`)
    rimraf.sync(outputPath)
  } catch (err) {
    console.log(`清理目录失败: ${chalk.cyan(outputPath.replace(cwd, ''))}`)
  }
}

function buildAfter(outputPath, stats) {
  console.log('File sizes after gzip:\n')
  printFileSizesAfterBuild(
    stats,
    {
      root: outputPath,
      sizes: {}
    },
    outputPath,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  )
  console.log()
}

function bundler(webpackConfig): Promise<{ stats: webpack.Stats }> {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        try {
          console.log(stats.toString('errors-only'))
        } catch (e) {}
        console.error(err)
        return reject(new Error('build failed'))
      }
      resolve({ stats })
    })
  })
}

export default async function build(webpackConfig, cwd) {
  try {
    const outputPath = webpackConfig.output.path
    clearOutput(outputPath, cwd)
    const result = await bundler(webpackConfig)
    buildAfter(outputPath, result.stats)
  } catch (error) {
    console.log(error)
  }
}
