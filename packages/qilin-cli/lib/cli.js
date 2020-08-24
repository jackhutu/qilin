'use strict'

const program = require('commander')

const chalk = require('chalk')

const spawn = require('cross-spawn')

const os = require('os')

const args = process.argv.slice(3)
const nodeVersion = process.versions.node
const versions = nodeVersion.split('.')
const major = parseInt(versions[0])
const minor = parseInt(versions[1])
const platform = os.platform()

if (major * 10 + minor * 1 < 80) {
  console.log(chalk.red(`Node version (${major}.${minor}) is not compatibile, ${chalk.cyan('must >= 8.0')}.`))
  console.log(chalk.red(`你的 Node 版本是 ${chalk.yellow(`${major}.${minor}`)}，请升级到${chalk.cyan(' 8.0 或以上')}.`))
  console.log()

  if (platform === 'darwin') {
    console.log(`推荐用 ${chalk.cyan('https://github.com/creationix/nvm')} 管理和升级你的 node 版本。`)
  } else if (platform === 'win32') {
    console.log(`推荐到 ${chalk.cyan('https://nodejs.org/')} 下载最新的 node 版本。`)
  }

  process.exit(1)
}

const execCommand = script => {
  const result = spawn.sync(
    'node',
    [require.resolve(`./${script}`)].concat(args),
    {
      stdio: 'inherit'
    } // eslint-disable-line
  )
  process.exit(result.status)
}

const updater = require('update-notifier')

const pkg = require('../package.json')

updater({
  pkg
}).notify({
  defer: true
})
program.version(pkg.version, '-v, --version')
program
  .command('dev')
  .option('--cwd <path>')
  .description('development mode')
  .action(function(cmd, options) {
    execCommand('dev')
    console.log(cmd)
    console.log(options)
    return cmd
  })
program
  .command('build')
  .description('build mode')
  .action(function(cmd, options) {
    execCommand('build')
    return cmd
  })
program.on('--help', function() {
  console.log('  Examples:')
  console.log()
  console.log('    $ qilin dev')
  console.log('    $ qilin build')
  console.log()
})
program.parse(process.argv)
if (!program.dev && !program.build) program.help()
