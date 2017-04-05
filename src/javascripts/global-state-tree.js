//

var baobabClass = require('baobab');


module.exports = (function() {
  var date = Date.now();

  return new baobabClass({
    global: {
      logCounts: {},
      endTime: date,
      beginTime: (date - 60000), //TODO: map this to shared timers
      startedTime: date,
      gTime: date
    }
  }, {
    immutable: true,
    asynchronous: true,
    autoCommit: true,
    lazyMonkeys: false,
    persistent: true
  });
});
