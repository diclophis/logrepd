// logrepd

var process = require("process");
var sequelize = require("sequelize");
var timers = require("timers");

var databaseName = process.env["PG_DATABASE"] || 'fluentd';
var tableName = process.env["FLUENTD_TABLE"] || 'fluentd';

var connectString = 'postgres://' + process.env["PG_USERNAME"] + '@' + process.env["PG_HOST"] + '/' + databaseName;

var sequelizeConnection = new sequelize(connectString);

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
  tableName: tableName
});

// NOTE: http://docs.sequelizejs.com/en/v3/docs/legacy/
fluentd.removeAttribute('id');
fluentd.removeAttribute('createdAt');
fluentd.removeAttribute('updatedAt');

fluentd.sync().then(function() {
  timers.setInterval(function() {
    console.log("every second");
  }, 1000);

  fluentd.findAll().then(function(rows) {
    console.log(rows);
  });
});
