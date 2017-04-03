//

var React = require('react');
var treeMixins = require('baobab-react/mixins');


var GlobalLogCounterComponent = React.createClass({
  mixins: [treeMixins.branch],

  cursors: {
    logCount: ['global', 'logCount'],
    endTime: ['global', 'endTime'],
    beginTime: ['global', 'beginTime'],
    startedTime: ['global', 'startedTime'],
    gTime: ['global', 'gTime']
  },

/*
  componentWillReceiveProps: function(nextProps) {
		var timeWidth = (this.state.endTime - this.state.beginTime); //this.state.logCount;
    if (timeWidth > 5000) {
      this.setState({beginTime: (endTime - 4000)});
    }
  },
*/
/*
  getInitialState: function() {
    var defaultState = {
      beginTime: Date.now()
    }
    return defaultState;
  },
*/

  render: function() {
    var followingGlobalEndTime = true;

    var endTime = 0;
    var beginTime = 0;
    var startedTime = 0;

//console.log(this.state);
//debugger;

    if (followingGlobalEndTime) { // && this.state && this.state.endTime) {
      endTime = this.state.endTime;
      //beginTime = endTime - (60 * 1000);
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
      transform: "scale(0.5)",
      overflow: "visible",
      border: "1px solid red"
		};

		var timeWidth = (endTime - beginTime); //this.state.logCount;
    var distanceFromStartedTime = (this.state.gTime - startedTime);
    var fractionOfSecond = ((distanceFromStartedTime / 1000.0) % 1);

    var timeGrid = 1000.0;
    var lineWidthMod = 2.0 / 10.0;

		var gridLines = [];
    var gridTimestamps = [];
    var textMod = 10.0;

    var endEnd = new Date(endTime);

    var unitOfGrid = ((1.0) / timeWidth); // + endEnd.getMilliseconds();
    var halfAUnitOfMod = ((fractionOfSecond / 1.0) * unitOfGrid); // * (unitOfGrid * 5000.0); //(0.5/(timeWidth / timeGrid / textMod)) * 0.0;
    //console.log((fractionOfSecond/1.0), unitOfGrid, halfAUnitOfMod);

    var ii = 0;
		for (var i=0.0; i<timeWidth; i+=timeGrid) {
      var xOff = (((i * unitOfGrid) - halfAUnitOfMod) * 100.0);
      var width = lineWidthMod;

      var t = ""; //ii.toString();
      var shouldShowGridLine = false;
      var shouldShowGridText = false;

      var msOfTimestamp = (beginTime + i);
      var dateOfTimestamp = new Date(beginTime + i);

      if ((dateOfTimestamp.getSeconds() % 5) == 0 || (dateOfTimestamp.getSeconds() % 5) == 5) {
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
				  <text x="10%" y="10%" textAnchor="middle" fill="black" filter="url(#solid)">
            {this.state.gTime}
          </text>
				</svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
