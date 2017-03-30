// Isomorphic Single Page Javascript Application


entryPoint = function(bootstrap, mainContainer) {
  console.log("js begins here");
  bootstrap(mainContainer);
};


module.exports = {};
module.exports.render = function(packageModule, js) {
  var React = require('react');
  var htmlComponent = require('./html');

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(htmlComponent, {
    packageModule: packageModule,
    js: js
  }));
};
