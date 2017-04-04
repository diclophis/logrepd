//

var React = require('react');
var ReactDOM = require('react-dom');
var MainComponent = require('./main');
var hydrate = require('./hydrate');
var globalStateTree = require('./global-state-tree')(); // 1/2 locations, for client-side
var globalCursor = globalStateTree.select('global');


var logCountsUpdater = function(valToSet) {
  globalCursor.set('logCounts', valToSet);
  globalStateTree.commit();
};

var keepUpdatingCount = function() {
  hydrate.get("global/logCounts").then(function(valAtInterval) {
    logCountsUpdater(valAtInterval);
    setTimeout(keepUpdatingCount, 1000);
  });
};

var keepUpdatingTimestamps = function() {
  var newEndTime = Date.now();
  //var timeWidth = newEndTime - globalCursor.get('beginTime');
  //TODO: debug-time-mode
  //globalCursor.get('endTime') + 100;
  var otherEnd = newEndTime;

  globalCursor.set('gTime', otherEnd);
  globalCursor.set('endTime', otherEnd);

  //TODO: option for graph duration
  globalCursor.set('beginTime', (otherEnd - (60 * 1000)));
  globalStateTree.commit();

  setTimeout(keepUpdatingTimestamps, 66);

  //TODO: clunk-mode
  //window.requestAnimationFrame(keepUpdatingTimestamps);
};

(function() {
  console.log("all browser js starts here");

  if (true) {
    keepUpdatingTimestamps();
    keepUpdatingCount();

    var mainContainer = document.getElementById('main-container');
    ReactDOM.render(<MainComponent tree={globalStateTree} />, mainContainer);
  }
})();


module.exports = {};
