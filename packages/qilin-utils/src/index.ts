import address from 'address'
import chalk from 'chalk'

export function winPath(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}

export function clearConsole() {
  const { CLEAR_CONSOLE = 'none' } = process.env
  if (CLEAR_CONSOLE !== 'none') {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')
  }
}

export const isArray = Array.isArray.bind(Array)
export const isFunction = o => typeof o === 'function'

export { address }
export { chalk }
