const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: { bundle: './src/index.tsx' },
  module: {
    rules: [
      {
        test: /(\.js|\.ts|\.tsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true
  }
}
