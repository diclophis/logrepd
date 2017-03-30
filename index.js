// logrepd

var process = require("process");
var express = require('express');

var backend = require('./src/javascripts/backend');
var hydrate = require('./src/javascripts/hydrate');
var globalStateTree = require('./src/javascripts/global-state-tree')(); // 1/2 locations, for server-side

var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackDotConfig = require('./webpack.config');

var databaseName = process.env["PG_DATABASE"] || 'fluentd';
var tableName = process.env["FLUENTD_TABLE"] || 'fluentd';
var httpPort = process.env.PORT || 3001;
var postgresUrl = 'postgres://' + process.env["PG_USERNAME"] + '@' + process.env["PG_HOST"] + '/' + databaseName;

// backend data fetching is in this module
var backendStarted = backend.createConnection(postgresUrl, tableName, globalStateTree);

// asset compilation occurs here
// TODO: don't start server until first compilation completed
var webpackAssetCompilation = webpackMiddleware(webpack(webpackDotConfig), {
  // display no info to console (only warnings and errors) 
  noInfo: false,
  // display nothing to the console 
  quiet: false,
  // recompile every request
  lazy: true,
  // publicPath is required, whereas all other options are optional 
  publicPath: webpackDotConfig.output.publicPath, // TODO: figure this out
});

// TODO: refactor when all handlers are exports
var app = express();
// fetches the given cursor location from the global state tree
// TODO: dispatch event to update tree??
// TODO: figure out express.use
app.use(webpackAssetCompilation);
app.get('/hydrate/*', hydrate.createService(globalStateTree));
app.get('', backend.createStaticIndexServer(webpackDotConfig, globalStateTree));

var expressServer = app.listen(httpPort, function() {
  console.log('Listening for web on httpPort', httpPort);
});
