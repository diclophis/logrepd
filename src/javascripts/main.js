// primary entry point

var React = require('react');
var treeMixins = require('baobab-react/mixins');
var GlobalLogCounter = require('./global-log-counter');


var MainComponent = React.createClass({
  // Let's bind the component to the tree through the `root` mixin
  mixins: [(typeof(document) === "undefined") ? treeMixins.branch : treeMixins.root],

  getInitialState: function() {
    var defaultState = {
    }
    return defaultState;
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <GlobalLogCounter />
      </div>
    );
  }
});


module.exports = MainComponent;
