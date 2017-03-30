//

//var React = require('react');
//var MainComponent = require('./main');
//var globalStateTree = require('./global-state-tree');

var bluebird = require('bluebird');

var libraryFunction = function(key, callWithErrorAndValue) {
  key = key.replace(/[^a-zA-Z\/]/g, ''); //only allow 'a-z', and '/' chars

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("error", function(err) {
    callWithErrorAndValue(err);
  });

  xhr.addEventListener("load", function(ev) {
    console.log(ev, xhr.response);
    callWithErrorAndValue(null, JSON.parse(xhr.response));
  });

  xhr.open("GET", "/hydrate/" + key);
  xhr.send(null);
};

module.exports = {}

module.exports.get = bluebird.promisify(libraryFunction);

module.exports.set = function(key, value) {
};
