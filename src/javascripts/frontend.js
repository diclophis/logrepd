//

var React = require('react');
var ReactDOM = require('react-dom');
var MainComponent = require('./main');
var hydrate = require('./hydrate');
var globalStateTree = require('./global-state-tree')(); // 1/2 locations, for client-side
var globalCursor = globalStateTree.select('global');
var updateTimers = require('./shared').updateTimers;


var logCountsUpdater = function(valToSet) {
  globalCursor.merge('logCounts', valToSet);
  globalStateTree.commit();
};

var keepUpdatingCount = function() {
  hydrate.get("global/logCounts").then(function(valAtInterval) {
    logCountsUpdater(valAtInterval);
    setTimeout(keepUpdatingCount, 667 * 2);
  });
};

var keepUpdatingTimestamps = function() {
  updateTimers(globalCursor, globalStateTree);

  //TODO: non-clunk mode
  //window.requestAnimationFrame(keepUpdatingTimestamps);
  setTimeout(keepUpdatingTimestamps, 667);
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
