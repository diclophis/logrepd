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
}
