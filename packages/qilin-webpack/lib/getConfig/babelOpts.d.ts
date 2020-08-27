import { QilinWebpackConfig } from '../types'
export default function getBabelOpts(
  opts: QilinWebpackConfig
): {
  presets: (
    | string
    | Function
    | [string, any, string?]
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
    | Function
    | [string, any, string?]
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
            style: boolean
          }
      )[]
  )[]
  comments: boolean
}
