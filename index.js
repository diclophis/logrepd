// logrepd

var path = require("path");
var process = require("process");
var timers = require("timers");
var sequelize = require("sequelize");
var express = require('express');
var nodeJsx = require('node-jsx');
var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackDotConfig = require('./webpack.config');
var index = require('./src/javascripts/index');

// non-blocking ENV setup
var databaseName = process.env["PG_DATABASE"] || 'fluentd';
var tableName = process.env["FLUENTD_TABLE"] || 'fluentd';

var httpPort = process.env.PORT || 3001;
var postgresUrl = 'postgres://' + process.env["PG_USERNAME"] + '@' + process.env["PG_HOST"] + '/' + databaseName;

// debug data
//console.log(postgresUrl);

// blocking init functions
var jsxInstalled = nodeJsx.install();
var sequelizeConnection = new sequelize(postgresUrl);
var app = express();
var indexHtml = index.render(webpackDotConfig.output.library, webpackDotConfig.output.publicPath + '/' + webpackDotConfig.output.filename);

// NOTE: https://github.com/sequelize/sequelize/blob/master/docs/docs/models-definition.md
var fluentd = sequelizeConnection.define(tableName, {
  record: {
    type: sequelize.JSONB,
    field: 'record'
  },
  tag: {
    type: sequelize.TEXT,
    field: 'tag'
  }
}, {
  timestamps: false,
  tableName: tableName
});

// NOTE: http://docs.sequelizejs.com/en/v3/docs/legacy/
fluentd.removeAttribute('id');
fluentd.sync().then(function() {
  timers.setInterval(function() {
    console.log("every second");
    fluentd.create({ tag: "", record: {foo: "bar"} }).then(function(fakeLog) {
      //console.log(fakeLog.get('record')); // John Doe (SENIOR ENGINEER)
    });

    //fluentd.findAll().then(function(rows) {
    //  console.log(rows);
    //});

    fluentd.count().then(function(c) {
      console.log(c);
    });
  }, 10000);
});

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

app.get('/index.html', function(req, res) {
	res.send(indexHtml);
});

var expressServer = app.listen(httpPort, function() {
  console.log('Listening for web on httpPort', httpPort);
});
