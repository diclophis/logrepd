//

var baobabClass = require('baobab');

module.exports = (function() {
  var date = Date.now();

  return new baobabClass({
    global: {
      logCounts: 0,
      endTime: date, //Date.now(),
      beginTime: (date - 60000), //(Date.now() - 1000),
      startedTime: date,
      gTime: date
    }
  }, {
    autoCommit: false,
    asynchronous: true,
    lazyMonkeys: false
  });
});
