//

var React = require('react');
var ReactDOM = require('react-dom');
var MainComponent = require('./main');
var hydrate = require('./hydrate');
var globalStateTree = require('./global-state-tree')(); // 1/2 locations, for client-side
var globalCursor = globalStateTree.select('global');


var logCountUpdater = function(valToSet) {
  globalCursor.set('logCount', valToSet);
  globalStateTree.commit();
};

var keepUpdatingCount = function() {
  hydrate.get("global/logCount").then(function(valAtInterval) {
    logCountUpdater(valAtInterval);
    setTimeout(keepUpdatingCount, 1000);
  });
};

var keepUpdatingTimestamps = function() {
  var newEndTime = Math.round(Date.now() / 1000.0) * 1000.0;
  //var timeWidth = newEndTime - globalCursor.get('beginTime');
  //console.log(newEndTime);

  globalCursor.set('gTime', Date.now());
  globalCursor.set('endTime', newEndTime);
  globalCursor.set('beginTime', (newEndTime - 60000));

  globalStateTree.commit();

  setTimeout(keepUpdatingTimestamps, 33);
};

module.exports = function(mainContainer) {
  console.log("all browser js starts here");

  hydrate.get("global/logCount").then(function(initialVal) {
    logCountUpdater(initialVal);
    //keepUpdatingCount();
    keepUpdatingTimestamps();

    ReactDOM.render(<MainComponent tree={globalStateTree} />, mainContainer);
  });

  return {};
};
