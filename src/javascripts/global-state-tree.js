//

var baobabClass = require('baobab');

module.exports = (function() {
  var date = Date.now();

  return new baobabClass({
    global: {
      logCounts: {},
      endTime: date, //Date.now(),
      beginTime: (date - 60000), //(Date.now() - 1000),
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
