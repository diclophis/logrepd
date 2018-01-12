//

var baobabClass = require("baobab");
var webpackDotConfig = require("../../webpack.config");

module.exports = function() {
  var date = Date.now();

  return new baobabClass(
    {
      global: {
        logCounts: {},
        endTime: date,
        beginTime: date - 60000, //TODO: map this to shared timers
        startedTime: date,
        gTime: date
      },
      webpackDotConfig: webpackDotConfig
    },
    {
      immutable: false, //TODO: fix webpackConfig
      asynchronous: true,
      autoCommit: true,
      lazyMonkeys: false,
      persistent: true
    }
  );
};
