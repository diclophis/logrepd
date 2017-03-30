//

var React = require('react');
var MainComponent = require('./main');

module.exports = {};

console.log("wtF");

module.exports.attach = function(mainContainer) {
  return React.render(<MainComponent bootstrapped={true} />, mainContainer);
};
