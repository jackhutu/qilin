import webpack from 'webpack'
import { QilinWebpackConfig } from '../types'
export default function getConfig(opts: QilinWebpackConfig): Promise<webpack.Configuration>
