const path = require('path')
const glob = require('glob')

module.exports = {
  entry: {
    popup: glob.sync('./src/popup/*.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/build.js"
  },
  module: {
    rules: [
      {
        test: /.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
