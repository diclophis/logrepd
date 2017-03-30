//

var React = require('react');
var treeMixins = require('baobab-react/mixins');


var GlobalLogCounterComponent = React.createClass({
  mixins: [treeMixins.branch],
  cursors: {
    logCount: ['global', 'logCount']
  },

  render: function() {
    return (
      <div>
        {this.state.logCount}
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
