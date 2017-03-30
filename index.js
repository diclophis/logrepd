// logrepd

var path = require("path");
var process = require("process");

//process.env.NODE_ENV = "production";

var timers = require("timers");
var sequelize = require("sequelize");
var express = require('express');

var globalStateTree = require('./src/javascripts/global-state-tree')();
var globalCursor = globalStateTree.select('global');

var nodeJsx = require('node-jsx');
var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackDotConfig = require('./webpack.config');
var databaseName = process.env["PG_DATABASE"] || 'fluentd';
var tableName = process.env["FLUENTD_TABLE"] || 'fluentd';
var httpPort = process.env.PORT || 3001;
var postgresUrl = 'postgres://' + process.env["PG_USERNAME"] + '@' + process.env["PG_HOST"] + '/' + databaseName;

// TODO: refactor when all handlers are exports
var app = express();


// this is all of the model layer
// NOTE: https://github.com/sequelize/sequelize/blob/master/docs/docs/models-definition.md
var sequelizeConnection = new sequelize(postgresUrl);
var fluentd = sequelizeConnection.define(tableName, {
  record: {
    type: sequelize.JSONB,
    field: 'record'
  },
  tag: {
    type: sequelize.TEXT,
    field: 'tag'
  },
  time: {
    type: sequelize.DATE,
    field: 'time'
  }
}, {
  timestamps: false,
  tableName: tableName
});
// NOTE: http://docs.sequelizejs.com/en/v3/docs/legacy/
fluentd.sync().then(function() {
  fluentd.removeAttribute('id');
  var fakeRecord = {foo: 'bar'};

  timers.setInterval(function() {
    fluentd.create({tag: "", record: fakeRecord}).then(function(fakeLog) {
      console.log(fakeRecord, fakeLog.get('record'));
    });

    //fluentd.findAll().then(function(rows) {
    //  console.log(rows);
    //});

    fluentd.count().then(function(c) {
      globalCursor.set('logCount', c);
    });
  }, 500);
});
// fetches the given cursor location from the global state tree
// TODO: dispatch event to update tree??
app.get('/hydrate/*', function(req, res) {
  var cursorArgs = req.url.replace(/^\//g, '').split("/")
  cursorArgs.shift();

  var json = globalStateTree.serialize(cursorArgs);

  res.send(JSON.stringify(json));
});


// asset compilation occurs here
var webpackAssetCompilation = webpackMiddleware(webpack(webpackDotConfig), {
  // display no info to console (only warnings and errors) 
  noInfo: false,
  // display nothing to the console 
  quiet: false,
  // recompile every request
  lazy: true,
  // publicPath is required, whereas all other options are optional 
  publicPath: webpackDotConfig.output.publicPath,
});
app.use(webpackAssetCompilation);


// react server side rendering occurs here
var jsxInstalled = nodeJsx.install();
var index = require('./src/javascripts/index');
app.get('', function(req, res) {
  var indexHtml = index.renderHtml(webpackDotConfig, globalStateTree);
	res.send(indexHtml);
});

var expressServer = app.listen(httpPort, function() {
  console.log('Listening for web on httpPort', httpPort);
});
