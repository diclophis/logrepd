// logrepd

var path = require("path");
var process = require("process");
var timers = require("timers");

var sequelize = require("sequelize");

var express = require('express');

var nodeJsx = require('node-jsx');

var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");

var jsxInstalled = nodeJsx.install();

var databaseName = process.env["PG_DATABASE"] || 'fluentd';
var tableName = process.env["FLUENTD_TABLE"] || 'fluentd';

var connectString = 'postgres://' + process.env["PG_USERNAME"] + '@' + process.env["PG_HOST"] + '/' + databaseName;

var sequelizeConnection = new sequelize(connectString);

var app = express();

//console.log(connectString);
//console.log(sequelizeConnection);

// NOTE: https://github.com/sequelize/sequelize/blob/master/docs/docs/models-definition.md
fluentd = sequelizeConnection.define(tableName, {
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
//fluentd.removeAttribute('createdAt');
//fluentd.removeAttribute('updatedAt');

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

var webpackConfig = webpack({
    // webpack options 
    // webpackMiddleware takes a Compiler object as first parameter 
    // which is returned by webpack(...) without callback. 
    //entry: "#{__dirname}/src/javascripts",
    //output: {
    //    path: "/"
    //    // no real path is required, just pass "/" 
    //    // but it will work with other paths too. 
    //}
    //output-library $1 --output-library-target umd $2 $3

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
    path: path.join(__dirname, 'public/assets/javascripts'),
    filename: 'bundle.js',
    publicPath: '/assets'
  }
});

app.use(webpackMiddleware(webpackConfig, {
    // publicPath is required, whereas all other options are optional 
 
    noInfo: false,
    // display no info to console (only warnings and errors) 
 
    quiet: false,
    // display nothing to the console 
 
    lazy: true,
    // switch into lazy mode 
    // that means no watching, but recompilation on every request 
 
//    watchOptions: {
//        aggregateTimeout: 300,
//        poll: true
//    },
    // watch options (only lazy: false) 
 
    publicPath: "/assets",
    // public path to bind the middleware to 
    // use the same as in webpack 
    
 
//    headers: { "X-Custom-Header": "yes" },
//    // custom headers 
 
//    stats: {
//        colors: true
//    },
//    // options for formating the statistics 
 
//    reporter: null,
//    // Provide a custom reporter to change the way how logs are shown. 
 
//    serverSideRender: false,
//    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info. 

    index: "index.html" // the index path for web server 
}));

app.get('/index.html', function(req, res) {

var index = require('./src/javascripts/index');
var html = index.render("logrepd", "assets/bundle.js");

//\"$3\", \"javascripts/$(echo $1 | xargs basename)?$(shasum $1 | cut -f1 -d' ')\", \"stylesheets/$(echo $2 | xargs basename)?$(shasum $2 | cut -f1 -d' ')\")"

	res.send(html);
});

// run make to update if request is for development
app.use(function(req, res, next) {
  next();
});

var webpackMiddleware = require("webpack-dev-middleware");

var port = process.env.PORT || 3001;
var expressServer = app.listen(port);

console.log('Listening for web on port', port);
