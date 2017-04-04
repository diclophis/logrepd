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

    var endTime = 60000;
    var beginTime = 0;
    var startedTime = 0;

//console.log(this.state);
//debugger;

    if (followingGlobalEndTime) { // && this.state && this.state.endTime) {
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

		var timeWidth = (endTime - beginTime); //this.state.logCount;
    var distanceFromStartedTime = ((this.state.gTime) - startedTime);

//-0.99 -0.495
//bundle.js:13180 -0.988 -0.494
//bundle.js:13180 0.019 0.0095

    var fractionOfSecond = ((distanceFromStartedTime / 1000.0) % 1);

    //console.log(fractionOfSecond);

    var timeGrid = 1000.0;
    var lineWidthMod = 2.0 / 10.0;

		var gridLines = [];
    var gridTimestamps = [];
    var textMod = 10.0;

    var endEnd = new Date(endTime);

    var unitOfGrid = ((1.0) / timeWidth); // + endEnd.getMilliseconds();
    //TODO: clunk-mode
    var halfAUnitOfMod = (fractionOfSecond / 1.0) * (timeGrid / timeWidth); //((fractionOfSecond / (0.5)) * (unitOfGrid * 500.0));

    // * (unitOfGrid * 5000.0); //(0.5/(timeWidth / timeGrid / textMod)) * 0.0;
    //0 2000 2000 NaN NaN NaN 0.0005 NaN
    //0 2000 1491288055076 undefined 2000 NaN NaN NaN 0.0005 NaN
    //console.log(beginTime, endTime, startedTime, this.state.gTime, timeWidth, distanceFromStartedTime, fractionOfSecond, (fractionOfSecond/1.0), unitOfGrid, halfAUnitOfMod);

    var ii = 0;
		for (var i=0.0; i<(timeWidth + (timeGrid * 2.0)); i+=timeGrid) {
      //console.log(i, timeWidth);

      var xOff = (((i * unitOfGrid) - halfAUnitOfMod) * 100.0);
      var width = lineWidthMod;

      var t = ""; //ii.toString();
      var shouldShowGridLine = false;
      var shouldShowGridText = false;

      var msOfTimestamp = Math.floor(beginTime + i - (fractionOfSecond * 1000.0));
      var dateOfTimestamp = new Date(msOfTimestamp);
      var modName = "-slim";

      var isMod = (Math.floor(msOfTimestamp / 1000) % 5) === 0;

      if (isMod) { //(((msOfTimestamp) % 6000) == 0) { // || (dateOfTimestamp.getSeconds() % 5) == 5) {
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
      var xOffFontp = (xOff) + "%"; // - ((0.5 * fontWidth) + (0.5 * width))) + "%";

			var fontSizep = 1 + "em";

      var fontId = "font-" + xOffFontp + modName + ii;
      var gridId = "grid-" + xOffp + modName + ii;

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
					<circle cx="50%" cy="50%" r={20} fill="red" />
					{gridLines}
					{gridTimestamps}
				  <text x="90%" y="90%" textAnchor="middle" fill="black" filter="url(#solid)">
            {Object.keys(this.state.logCounts).length} {this.state.gTime}
          </text>
				</svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
