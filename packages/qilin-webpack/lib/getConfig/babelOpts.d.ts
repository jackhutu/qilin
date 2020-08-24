import { QilinWebpackConfig } from '../types'
export default function getBabelOpts(
  opts: QilinWebpackConfig
): {
  presets: (
    | string
    | (
        | string
        | {
            useBuiltIns: string
            corejs: number
            modules: boolean
          }
      )[]
  )[]
  plugins: (
    | string
    | (
        | string
        | {
            legacy: boolean
          }
      )[]
    | (
        | string
        | {
            loose: boolean
          }
      )[]
    | (
        | string
        | {
            helpers: boolean
          }
      )[]
    | (
        | string
        | {
            libraryName: string
            libraryDirectory: string
            style: string
          }
      )[]
  )[]
  comments: boolean
}
