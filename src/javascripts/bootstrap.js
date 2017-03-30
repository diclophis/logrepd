//

var React = require('react');
var MainComponent = require('./main');
var globalStateTree = require('./global-state-tree')();
var hydrate = require('./hydrate');


module.exports = function(mainContainer) {
  console.log("OR HERE");

  hydrate.get("global/logCount").then(function(val) {
    //console.log("hydrate!", val);
    //globalStateTree

    var globalCursor = globalStateTree.select('global');
    globalCursor.set('logCount', val);
    globalStateTree.commit();

    React.render(<MainComponent tree={globalStateTree} />, mainContainer);
  });

  return {};
};
