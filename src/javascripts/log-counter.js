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
      top: 0,
      transform: "scale(0.5)",
      overflow: "visible"
		};

		var timeWidth = (this.props.endTime - this.props.beginTime); //this.state.logCount;
    
    var timeGrid = 1000;
    var lineWidthMod = 2 / 10;

		var gridLines = [];
    var gridTimestamps = [];
    var textMod = 10;

    var halfAUnitOfMod = (0.5/(timeWidth / timeGrid / textMod)) * 0.0;
    var unitOfGrid = (1 / timeWidth);

    var ii = 0;
		for (var i=0; i<timeWidth; i+=timeGrid) {
      var xOff = (((i * unitOfGrid) + halfAUnitOfMod) * 100);
      var width = lineWidthMod;

      var t = ""; //ii.toString();
      var shouldShowGridLine = false;
      var shouldShowGridText = false;

      if (((ii + (textMod/2)) % textMod) == 0) {
        var dateOfTimestamp = new Date(this.props.beginTime + i);

        t = dateOfTimestamp.toLocaleTimeString();
        shouldShowGridLine = true;
        shouldShowGridText = true;
      } else {
        shouldShowGridLine = true;
        width = 0.333 * lineWidthMod;
      }

      var xOffp = (xOff - (0.5 * width)) + "%";
      var widthp = width + "%";

			var fontWidth = 2;
      var xOffFontp = (xOff) + "%"; // - ((0.5 * fontWidth) + (0.5 * width))) + "%";

			var fontSizep = 1 + "em";


      var fontId = "font-" + xOffFontp;
      var gridId = "grid-" + xOffp;

			var gridTimestamp = (
				<text key={fontId} x={xOffFontp} y="5%" textAnchor="middle" fontSize={fontSizep} fill="black" filter="url(#solid)">
					{t}
				</text>
			);

			var gridLine = (
				<rect key={gridId} x={xOffp} y={0} width={widthp} height="100%" fill="blue" />
			);

      if (shouldShowGridLine) {
        gridLines.push(gridLine);
      }

      if (shouldShowGridText) {
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
