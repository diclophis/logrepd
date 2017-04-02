//

var React = require('react');
var treeMixins = require('baobab-react/mixins');


var GlobalLogCounterComponent = React.createClass({
  mixins: [treeMixins.branch],
  cursors: {
    logCount: ['global', 'logCount']
  },

  render: function() {
		var graphStyle = {
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
      top: 0
		};

		var timeWidth = this.state.logCount;
    var timeGrid = 1;
    var lineWidthMod = 1 / 10;

		var gridLines = [];
    var gridTimestamps = [];

		for (var i=0; i<timeWidth; i++) {
      var xOff = (((timeGrid / timeWidth) * (i + 0.5)) * 100);
      var width = lineWidthMod;

      var xOffp = (xOff - (0.5 * width)) + "%";
      var widthp = width + "%";

			var fontWidth = 2;
      var xOffFontp = (xOff) + "%"; // - ((0.5 * fontWidth) + (0.5 * width))) + "%";

			var fontSizep = 1 + "em";

			var gridTimestamp = (
				<text x={xOffFontp} y="5%" textAnchor="middle" fontSize={fontSizep}>
					{i}
				</text>
			);

			var gridLine = (
				<rect x={xOffp} y={0} width={widthp} height="100%" fill="blue" />
			);

      gridLines.push(gridLine);
      gridTimestamps.push(gridTimestamp);
		}

    return (
      <div>
        <h1>
					{this.state.logCount}
				</h1>
				<svg style={graphStyle}>
					<circle cx="50%" cy="50%" r={20} fill="red" />
					{gridLines}
					{gridTimestamps}
				</svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
