// Isomorphic Single Page Javascript Application

var React = require('react');
var HtmlComponent = require('./html');


// console.log("browser js begins here technically, but not all requires are avail.");
console.log("aasdasd");

function clone(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  var objectClone;
  
  // Filter out special objects.
  var Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }
  
  // Clone each property.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = clone(objectToBeCloned[prop]);
  }
  
  return objectClone;
}


module.exports = {};
module.exports.renderHtml = function(webpackDotConfig, globalStateTree) {
  var packageModule = webpackDotConfig.output.library;
  var js = (webpackDotConfig.output.publicPath + '/' + webpackDotConfig.output.filename);

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(HtmlComponent, {
    tree: globalStateTree,
    packageModule: packageModule,
    js: js
  }));
};
