// Isomorphic Single Page Javascript Application

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bluebird = require("bluebird");
var HtmlComponent = require("./html");

var libraryFunction = function(webpackDotConfigAndTree, callWithErrorAndValue) {
  //webpackDotConfigAndTree.webpackDotConfig;

  var globalStateTree = webpackDotConfigAndTree.globalStateTree;
  var webpackDotConfig = globalStateTree.get("webpackDotConfig");

  var packageModule = webpackDotConfig.output.library;
  var js =
    webpackDotConfig.output.publicPath + "/" + webpackDotConfig.output.filename;

  callWithErrorAndValue(
    null,
    "<!DOCTYPE html>" +
      ReactDOMServer.renderToStaticMarkup(
        React.createElement(HtmlComponent, {
          treeInbound: globalStateTree,
          packageModule: packageModule,
          js: js
        })
      )
  );
};

module.exports = {};
module.exports.renderHtml = bluebird.promisify(libraryFunction);
