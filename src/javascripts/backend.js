//

var sequelize = require("sequelize");
var timers = require("timers");
var nodeJsx = require("node-jsx");
var updateTimers = require("./shared").updateTimers;
var fluentdG = null;

var createStaticIndexServer = function(globalStateTree) {
  var globalCursor = globalStateTree.select("global");

  // react server side rendering occurs here
  var jsxInstalled = nodeJsx.install(); // reconsider JSX...
  var index = require("./index");

  return function(req, res) {
    updateTimers(globalCursor, globalStateTree);
    index
      .renderHtml({ globalStateTree: globalStateTree })
      .then(function(indexHtml) {
        res.send(indexHtml);
      });
  };
};

var createConnection = function(postgresUrl, tableName, globalStateTree) {
  var globalCursor = globalStateTree.select("global");

  // this is all of the model layer
  // NOTE: https://github.com/sequelize/sequelize/blob/master/docs/docs/models-definition.md
  var sequelizeConnection = new sequelize(postgresUrl, {
    logging: false,
    maxConcurrentQueries: 1,
    pool: { maxConnections: 1, maxIdleTime: 30 }
  });

  var fluentd = sequelizeConnection.define(
    tableName,
    {
      record: {
        type: sequelize.JSONB,
        field: "record"
      },
      tag: {
        type: sequelize.TEXT,
        field: "tag"
      },
      time: {
        type: sequelize.DATE,
        field: "time",
        defaultValue: sequelize.fn("NOW")
      }
    },
    {
      timestamps: false,
      tableName: tableName
    }
  );

  fluentdG = fluentd;

  // NOTE: http://docs.sequelizejs.com/en/v3/docs/legacy/
  fluentd.sync().then(function() {
    fluentd.removeAttribute("id");

    timers.setInterval(function() {
      var countSecond = "SELECT DISTINCT";
      countSecond += "   date_trunc('second', \"time\") AS second, ";
      countSecond += "   count(*) AS count";
      countSecond += "   FROM fluentd";
      countSecond += "   WHERE time > NOW() - INTERVAL '2 minute'";
      countSecond += "   GROUP BY second;";

      sequelizeConnection
        .query(countSecond)
        .spread(function(results, metadata) {
          var newState = {};

          for (var i = 0; i < results.length; i++) {
            newState[results[i].second.getTime()] = results[i].count;
          }

          globalCursor.merge("logCounts", newState);
        });

      //http://stackoverflow.com/questions/8193688/postgresql-running-count-of-rows-for-a-query-by-minute
      //https://www.postgresql.org/docs/current/static/functions-datetime.html#FUNCTIONS-DATETIME-TRUNC

      //SELECT DISTINCT
      //       date_trunc('second', "time") AS minute
      //      ,count(*) OVER (ORDER BY date_trunc('second', "time")) AS running_ct
      //FROM   fluentd
      //ORDER  BY 1;
    }, 333);
  });
};

module.exports = {};
module.exports.createStaticIndexServer = createStaticIndexServer;
module.exports.createConnection = createConnection;
