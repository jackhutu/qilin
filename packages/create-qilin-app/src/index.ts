import createApp from './createApp'

export default async ({ cwd, args, pkg }) => {
  const CreateApp = new createApp({
    cwd,
    args,
    pkg
  })
  await CreateApp.run()
}
