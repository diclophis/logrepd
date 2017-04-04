//

var baobabClass = require('baobab');

module.exports = (function() {
  return new baobabClass({
    global: {
      logCount: 0,
      endTime: 120000, //Date.now(),
      beginTime: 0, //(Date.now() - 1000),
      startedTime: Date.now()
    }
  }, {
    autoCommit: false,
    asynchronous: true,
    lazyMonkeys: false
  });
});
