//

var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");

module.exports = {}

module.exports.createService = function(webpackDotConfig) {
  return webpackMiddleware(webpack(webpackDotConfig), {
    // display no info to console (only warnings and errors) 
    noInfo: false,
    // display nothing to the console 
    quiet: false,
    // recompile every request
    lazy: true,
    // publicPath is required, whereas all other options are optional 
    publicPath: webpackDotConfig.output.publicPath, // TODO: figure this out
  });
};
