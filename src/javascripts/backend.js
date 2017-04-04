//

var sequelize = require("sequelize");
var timers = require("timers");
var nodeJsx = require('node-jsx');
var updateTimers = require('./shared').updateTimers;


var createStaticIndexServer = function(webpackDotConfig, globalStateTree) {
  var globalCursor = globalStateTree.select('global');

  // react server side rendering occurs here
  var jsxInstalled = nodeJsx.install(); // reconsider JSX...
  var index = require('./index');

  return (function(req, res) {
    updateTimers(globalCursor, globalStateTree);
    index.renderHtml({webpackDotConfig: webpackDotConfig, globalStateTree: globalStateTree}).then(function(indexHtml) {
      res.send(indexHtml);
    });
  });
};


var createConnection = function(postgresUrl, tableName, globalStateTree) {
  var globalCursor = globalStateTree.select('global');

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
      field: 'time',
      defaultValue: sequelize.fn('NOW')
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
        //globalCursor.set('endTime', Date.now());
        updateTimers(globalCursor, globalStateTree);

      fluentd.create({tag: "", record: fakeRecord}).then(function(fakeLog) {
        console.log(fakeRecord, fakeLog.get('record'));
      });

      //fluentd.findAll().then(function(rows) {
      //  console.log(rows);
      //});
      //


var countSecond = "SELECT DISTINCT";
countSecond += "   date_trunc('second', \"time\") AS second, ";
countSecond += "   count(*) OVER (ORDER BY date_trunc('second', \"time\")) AS count";
countSecond += "   FROM fluentd";
countSecond += "   WHERE time > NOW() - INTERVAL '1 minute'";
countSecond += "   ORDER BY 1;";

			sequelizeConnection.query(countSecond).spread(function(results, metadata) {
				console.log(results[0].second.getMilliseconds());
			});

//http://stackoverflow.com/questions/8193688/postgresql-running-count-of-rows-for-a-query-by-minute
//https://www.postgresql.org/docs/current/static/functions-datetime.html#FUNCTIONS-DATETIME-TRUNC

//SELECT DISTINCT
//       date_trunc('second', "time") AS minute
//      ,count(*) OVER (ORDER BY date_trunc('second', "time")) AS running_ct
//FROM   fluentd
//ORDER  BY 1;


      fluentd.count().then(function(c) {
        globalCursor.set('logCounts', {total: c});
      });
    }, 500);
  });

  //timers.setInterval(function() {
  //  updateTimers(globalCursor, globalStateTree);
  //}, 33);
};

module.exports = {}
module.exports.createStaticIndexServer = createStaticIndexServer;
module.exports.createConnection = createConnection
