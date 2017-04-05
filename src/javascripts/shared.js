//

module.exports = {};

module.exports.updateTimers = function(globalCursor, globalStateTree) {
  var newEndTime = Date.now();

  //TODO: debug-time mode
  //var timeWidth = newEndTime - globalCursor.get('beginTime');
  //globalCursor.get('endTime') + 100;

  var otherEnd = newEndTime;

  globalCursor.set('gTime', otherEnd);
  globalCursor.set('endTime', otherEnd);

  //TODO: option for graph duration
  globalCursor.set('beginTime', (otherEnd - (5 * 60 * 1000)));

  //TODO: support force commit??
  globalStateTree.commit();
};


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
