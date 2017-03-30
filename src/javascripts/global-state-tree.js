//

var baobabClass = require('baobab');

module.exports = (function() {
  return new baobabClass({
    global: {
      logCount: 0
    }
  }, {
    autoCommit: false,
    asynchronous: true,
    lazyMonkeys: false
  });
});
