// primary entry point

var React = require('react');


var MainComponent = React.createClass({
  getInitialState: function() {
    var defaultState = {}
    return defaultState;
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <h1>main</h1>
        <a href="?">#</a>
      </div>
    );
  }
});


module.exports = MainComponent;
