//

var React = require('react');
var MainComponent = require('./main');


module.exports = function(mainContainer) {
  return React.render(<MainComponent bootstrapped={true} />, mainContainer);
};
