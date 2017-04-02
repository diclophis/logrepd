// primary entry point

var React = require('react');
var treeMixins = require('baobab-react/mixins');
var LogCounter = require('./log-counter');


var MainComponent = React.createClass({
  // Let's bind the component to the tree through the `root` mixin, unless they are in nodejs process, see bootstrap
  mixins: [(typeof(document) === "undefined") ? treeMixins.branch : treeMixins.root],

/*
  getInitialState: function() {
    var defaultState = {
    }
    return defaultState;
  },

  componentDidMount: function() {
  },
*/

  render: function() {
    var endTime = Date.now();
    var beginTime = endTime - (60 * 1000);

    return (
      <div>
        <LogCounter beginTime={beginTime} endTime={endTime} />
      </div>
    );
  }
});


module.exports = MainComponent;
