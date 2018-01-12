// primary entry point

var React = require("react");
var treeMixins = require("baobab-react/mixins");
var LogCounter = require("./log-counter");

var MainComponent = React.createClass({
  mixins: [treeMixins.root],

  render: function() {
    return (
      <div>
        <LogCounter />
      </div>
    );
  }
});

module.exports = MainComponent;
