//

var React = require('react');
var MainComponent = require('./main');
var globalStateTree = require('./global-state-tree');


module.exports = function(mainContainer) {
  return React.render(<MainComponent tree={globalStateTree} bootstrapped={true} />, mainContainer);
};
