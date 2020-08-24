const program = require('commander')

const pkg = require('../package.json')

program.version(pkg.version, '-v, --version').action(function(cmd, env) {
  const args = cmd.args
  console.log(args)
  console.log(env)
  require('./')
    .default({
      cwd: process.cwd(),
      args,
      pkg
    })
    .catch((err: Error) => {
      console.error(`Create failed, ${err.message}`)
      console.error(err)
    })
})

program.parse(process.argv)
