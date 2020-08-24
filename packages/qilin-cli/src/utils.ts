import { join, isAbsolute } from 'path'

interface UtilsOpts {
  cwd?: string
}
export const getCwd = (opts: UtilsOpts = {}) => {
  let cwd = opts.cwd || process.env.APP_ROOT || process.cwd()
  if (!isAbsolute(cwd)) {
    return join(process.cwd(), process.env.APP_ROOT)
  }
  return cwd
}

export const getPkg = (dir?: string) => {
  let pkgDir = dir || getCwd()
  if (!isAbsolute(pkgDir)) {
    pkgDir = join(getCwd(), pkgDir)
  }
  try {
    return require(join(pkgDir, 'package.json'))
  } catch (error) {
    return null
  }
}
