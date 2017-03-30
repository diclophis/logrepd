// Isomorphic Single Page Javascript Application

var React = require('react');
var HtmlComponent = require('./html');
var bluebird = require('bluebird');

/*
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
*/

var libraryFunction = function(webpackDotConfigAndTree, callWithErrorAndValue) {
  var webpackDotConfig = webpackDotConfigAndTree.webpackDotConfig;
  var globalStateTree = webpackDotConfigAndTree.globalStateTree;

  var packageModule = webpackDotConfig.output.library;
  var js = (webpackDotConfig.output.publicPath + '/' + webpackDotConfig.output.filename);

  callWithErrorAndValue(null, '<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(HtmlComponent, {
    tree: globalStateTree,
    packageModule: packageModule,
    js: js
  })));
};



module.exports = {};
module.exports.renderHtml = bluebird.promisify(libraryFunction);
