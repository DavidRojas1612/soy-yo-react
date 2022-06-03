const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: './node_modules/@identy/identy-face/dist/assets/',
          from: `**/*`,
          to: './static/js/assets',
        },
        {
          context: './node_modules/@identy/identy-common/dist/assets/',
          from: `**/*`,
          to: './assets',
        },
      ],
    }),
  ],
}
