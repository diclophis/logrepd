// Isomorphic Single Page Javascript Application

var React = require('react');
var HtmlComponent = require('./html');


entryPoint = function(bootstrap, mainContainer) {
  console.log("js begins here");
  bootstrap(mainContainer);
};


module.exports = {};
module.exports.render = function(packageModule, js) {
  return '<!DOCTYPE html>' + React.renderToStaticMarkup(<HtmlComponent packageModule={packageModule} js={js} />);
};
