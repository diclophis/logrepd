//

var React = require('react');
var treeMixins = require('baobab-react/mixins');


var GlobalLogCounterComponent = React.createClass({
  mixins: [treeMixins.branch],

  cursors: {
    logCounts: ['global', 'logCounts'],
    endTime: ['global', 'endTime'],
    beginTime: ['global', 'beginTime'],
    startedTime: ['global', 'startedTime'],
    gTime: ['global', 'gTime']
  },

  render: function() {
    var followingGlobalEndTime = true;

    var endTime = 60000;
    var beginTime = 0;
    var startedTime = 0;

    if (followingGlobalEndTime) {
      endTime = this.state.endTime;
      beginTime = this.state.beginTime;
    } else {
    }

    startedTime = this.state.startedTime;

		var graphStyle = {
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
      top: 0,
      transform: "scale(1.0)",
      overflow: "visible",
      border: "1px solid red"
		};

		var timeWidth = (endTime - beginTime);
    var distanceFromStartedTime = ((this.state.gTime) - startedTime);

    var fractionOfSecond = ((distanceFromStartedTime / 1000.0) % 1);

    var timeGrid = 1000.0;
    var lineWidthMod = 2.0 / 10.0;
    var textMod = 10.0;

		var gridLines = [];
    var gridTimestamps = [];
    var metrics = [];

    var endEnd = new Date(endTime);

    var unitOfGrid = ((1.0) / timeWidth);
    //TODO: clunk-mode
    var halfAUnitOfMod = (fractionOfSecond / 1.0) * (timeGrid / timeWidth);

    var ii = 0;
		for (var i=0.0; i<(timeWidth + (timeGrid * 2.0)); i+=timeGrid) {
      var xOff = (((i * unitOfGrid) - halfAUnitOfMod) * 100.0);
      var width = lineWidthMod;

      var t = "";
      var shouldShowGridLine = false;
      var shouldShowGridText = false;

      var msOfTimestamp = Math.floor(beginTime + i - (fractionOfSecond * 1000.0));
      var dateOfTimestamp = new Date(msOfTimestamp);
      var modName = "-slim";

      var isMod = (Math.floor(msOfTimestamp / 1000) % 5) === 0;

      if (isMod) {
        t = dateOfTimestamp.toLocaleTimeString();
        shouldShowGridLine = true;
        shouldShowGridText = true;
        modName = "-fat";
      } else {
        shouldShowGridLine = true;
        width = 0.333 * lineWidthMod;
      }

      var xOffp = (xOff - (0.5 * width)) + "%";
      var widthp = width + "%";

			var fontWidth = 2;
      var xOffFontp = (xOff) + "%";

			var fontSizep = 1 + "em";

      var fontId = "font-" + xOffFontp + modName + ii;
      var gridId = "grid-" + xOffp + modName + ii;
      var metricId = "metric-" + xOffp + modName + ii;

      var metricCountIndex = (Math.floor(msOfTimestamp / 1000) * 1000) + 28800 - 17800; //UTC???
      var metricCount = this.state.logCounts[metricCountIndex];
      if (metricCount) {
        var metricCountp = ((metricCount / 100) * 100) + "%";
        //console.log(Object.keys(this.state.logCounts), metricCountIndex, metricCount);
        var metricBox = (
          <rect key={metricId} x={xOffp} y={0} width="1%" height={metricCountp} fill="red" />
        );
        metrics.push(metricBox);
      }

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
				<svg style={graphStyle}>
					<defs>
						<filter x="0" y="0" width="1" height="1" id="solid">
							<feFlood floodColor="white" />
							<feComposite in="SourceGraphic" />
						</filter>
					</defs> 
					{gridLines}
					{gridTimestamps}
          {metrics}
				  <text x="90%" y="90%" textAnchor="middle" fill="black" filter="url(#solid)">
            {Object.keys(this.state.logCounts).length} {this.state.gTime}
          </text>
				</svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
