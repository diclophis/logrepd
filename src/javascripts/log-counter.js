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

		var timeWidth = (this.props.endTime - this.props.beginTime); //this.state.logCount;
    
    var timeGrid = 1000;
    var lineWidthMod = 1 / 10;

		var gridLines = [];
    var gridTimestamps = [];

//debugger;
console.log(timeWidth);

    var ii = 0;
		for (var i=0; i<timeWidth; i+=timeGrid) {

      var xOff = ((((i + (0.5 * timeGrid)) / timeWidth)) * 100);
      var width = lineWidthMod;

      var xOffp = (xOff - (0.5 * width)) + "%";
      var widthp = width + "%";

			var fontWidth = 2;
      var xOffFontp = (xOff) + "%"; // - ((0.5 * fontWidth) + (0.5 * width))) + "%";

			var fontSizep = 1 + "em";

      var t = ""; //ii.toString();
      var shouldShowGridLine = false;

      if ((ii % 10) == 0) {
        var dateOfTimestamp = new Date(i);

        t = dateOfTimestamp.toLocaleTimeString();
        shouldShowGridLine = true;
      } 

			var gridTimestamp = (
				<text x={xOffFontp} y="5%" textAnchor="middle" fontSize={fontSizep} fill="black" filter="url(#solid)">
					{t}
				</text>
			);

			var gridLine = (
				<rect x={xOffp} y={0} width={widthp} height="100%" fill="blue" />
			);

      if (shouldShowGridLine) {
        gridLines.push(gridLine);
        gridTimestamps.push(gridTimestamp);
      }

      ii += 1;
		}

    return (
      <div>
        <h1>
					{this.state.logCount}
				</h1>
				<svg style={graphStyle}>
					<defs>
						<filter x="0" y="0" width="1" height="1" id="solid">
							<feFlood floodColor="white"/>
							<feComposite in="SourceGraphic"/>
						</filter>
					</defs> 
					<circle cx="50%" cy="50%" r={20} fill="red" />
					{gridLines}
					{gridTimestamps}
				</svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
