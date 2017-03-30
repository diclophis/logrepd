//

var sequelize = require("sequelize");
var timers = require("timers");


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
};

module.exports = {}
module.exports.createConnection = createConnection
