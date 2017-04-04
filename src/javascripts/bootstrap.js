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
  //TODO: clunk-mode

  var newEndTime = Date.now(); //Math.round(Date.now() / 1000.0) * 1000.0;
  //var timeWidth = newEndTime - globalCursor.get('beginTime');
  var otherEnd = newEndTime; //globalCursor.get('endTime') + 100;
  //console.log(otherEnd);

  globalCursor.set('gTime', otherEnd);
  globalCursor.set('endTime', otherEnd);
  globalCursor.set('beginTime', (otherEnd - 4000));

  globalStateTree.commit();

  //setTimeout(keepUpdatingTimestamps, 33);

  window.requestAnimationFrame(keepUpdatingTimestamps);
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
