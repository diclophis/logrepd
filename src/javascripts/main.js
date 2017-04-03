// primary entry point

var React = require('react');
var treeMixins = require('baobab-react/mixins');
var LogCounter = require('./log-counter');


var MainComponent = React.createClass({
  mixins: [treeMixins.root],

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

    return (
      <div>
        <LogCounter />
      </div>
    );
  }
});


module.exports = MainComponent;
