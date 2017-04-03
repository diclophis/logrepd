//

var React = require('react');
var ReactDOM = require('react-dom');
var MainComponent = require('./main');
var hydrate = require('./hydrate');
var globalStateTree = require('./global-state-tree')(); // 1/2 locations, for client-side
var globalCursor = globalStateTree.select('global');


var logCountUpdater = function(valToSet) {
  globalCursor.set('logCount', valToSet);
  globalCursor.set('endTime', Date.now());
  globalStateTree.commit();
};

var keepUpdatingCount = function() {
  hydrate.get("global/logCount").then(function(valAtInterval) {
    logCountUpdater(valAtInterval);
    setTimeout(keepUpdatingCount, 1000);
  });
};

module.exports = function(mainContainer) {
  console.log("all browser js starts here");

  hydrate.get("global/logCount").then(function(initialVal) {
    logCountUpdater(initialVal);
    keepUpdatingCount();

    ReactDOM.render(<MainComponent tree={globalStateTree} />, mainContainer);
  });

  return {};
};
