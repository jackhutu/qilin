import { UserConfig, QilinWebpackConfig } from './types'
interface QilinOpts {
  cwd?: string
  pkg?: Object
  args?: Object
}
export default class QilinWebpack {
  cwd: string
  pkg: Object
  args: Object
  config: UserConfig
  constructor(ops?: QilinOpts)
  init(): void
  getEntry(): string
  getOpts(env?: 'development' | 'production'): QilinWebpackConfig
  dev(): Promise<void>
  build(): Promise<void>
}
export {}
