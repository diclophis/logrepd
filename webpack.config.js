module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  entry: [
    './src/javascripts/bootstrap.js'
  ],

  output: {
    library: "logrepd",
    libraryTarget: "umd",
    filename: 'bundle.js',
    publicPath: '/assets'
  }
}
