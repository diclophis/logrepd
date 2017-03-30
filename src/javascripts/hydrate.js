//

var bluebird = require('bluebird');


var libraryFunction = function(key, callWithErrorAndValue) {
  key = key.replace(/[^a-zA-Z\/]/g, ''); // only allow 'a-zA-Z', and '/' chars

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("error", function(err) {
    callWithErrorAndValue(err);
  });

  xhr.addEventListener("load", function(ev) {
    callWithErrorAndValue(null, JSON.parse(xhr.response));
  });

  xhr.open("GET", "/hydrate/" + key);
  xhr.send(null);
};

var otherLibraryFunction = function(key, callWithErrorAndValue) {
};


module.exports = {}
module.exports.get = bluebird.promisify(libraryFunction);
module.exports.set = bluebird.promisify(otherLibraryFunction);
module.exports.createService = (function(globalStateTree) {
  var service = function(req, res) {
    var cursorArgs = req.url.replace(/^\//g, '').split("/")
    cursorArgs.shift();

    var json = globalStateTree.serialize(cursorArgs);

    res.send(JSON.stringify(json));
  };
  return service;
});
