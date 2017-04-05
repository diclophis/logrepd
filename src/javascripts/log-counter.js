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
      width: "1000%",
      height: "100%",
      left: 0,
      top: 0,
      transform: "scale(0.9)",
      overflow: "visible",
      //border: "1px solid red"
      background: "black"
    };

    var timeWidth = (endTime - beginTime);
    var distanceFromStartedTime = ((this.state.gTime) - startedTime);

    var fractionOfSecond = ((distanceFromStartedTime / 1000.0) % 1);

    var timeGrid = 1000.0;
    var lineWidthMod = 0.33;
    var textMod = 10.0;

    var gridLines = [];
    var gridTimestamps = [];
    var metrics = [];

    var endEnd = new Date(endTime);

    var unitOfGrid = ((1.0) / timeWidth);
    //TODO: clunk-mode
    var halfAUnitOfMod = (fractionOfSecond / 1.0) * (timeGrid / timeWidth);

    var ii = 0;
    var maxTime = (timeWidth + (timeGrid * 2.0));
    for (var i=0.0; i<maxTime; i+=timeGrid) {
      var xOff = (((i * unitOfGrid) - halfAUnitOfMod) * 100.0);
      var width = lineWidthMod;

      var t = "";
      var shouldShowGridLine = false;
      var shouldShowGridText = false;

      var msOfTimestamp = Math.floor(beginTime + i - (fractionOfSecond * 1000.0));
      var dateOfTimestamp = new Date(msOfTimestamp);
      var modName = "-slim";

      var modDelta = (1 * 60);
      var subDelta = modDelta / 3;

      var isMod = (Math.floor(msOfTimestamp / 1000) % (modDelta)) === 0;
      var isModLight = (Math.floor(msOfTimestamp / 1000) % (subDelta)) === 0;

      t = dateOfTimestamp.toLocaleTimeString();

      if (isMod) {
        shouldShowGridLine = true;
        shouldShowGridText = true;
        modName = "-fat";
      } else {
        if (isModLight) {
          shouldShowGridLine = true;
          //shouldShowGridText = true;
        }

        width = 0.333 * lineWidthMod;
      }

      var xOffp = (xOff - (0.5 * width)) + "%";
      var widthp = width + "em";

      var fontWidth = 2;
      var xOffFontp = (xOff) + "%";

      var fontSizep = 1 + "em";

      var fontId = "font-" + ii;
      var gridId = "grid-" + ii;
      var metricId = "metric-" + ii;

      var metricCountIndex = (Math.floor(msOfTimestamp / 1000) * 1000);
      var metricCount = this.state.logCounts[metricCountIndex];

      //if (((ii+5) * timeGrid) > maxTime) {
      //  console.log(dateOfTimestamp, Object.keys(this.state.logCounts), metricCountIndex, metricCount);
      //}

      if (metricCount) {
        var metricWidth = 0.1;
        var metricCounth = ((metricCount / 500) * 100)
        var metricCountp = (metricCounth) + "%";
        var metricOff = (xOff - ((0.5 * metricWidth))) + "%";
        var metricBox = (
          <rect key={metricId} x={metricOff} y={(0.5 * -metricCounth + 50) + "%"} width={metricWidth + "em"} height={metricCountp} fill="magenta" />
        );
        metrics.push(metricBox);
      }

      if (shouldShowGridLine) {
        var gridLine = (
          <rect key={gridId} x={xOffp} y={0} width={widthp} height="100%" fill="cyan" />
        );
        gridLines.push(gridLine);
      }

      if (shouldShowGridText) {
        var gridTimestamp = (
          <text key={fontId} x={xOffFontp} y="5%" textAnchor="middle" fontSize={fontSizep} fill="white" filter="url(#solid)">
            {t}
          </text>
        );
        gridTimestamps.push(gridTimestamp);
      }

      ii += 1;
    }

    return (
      <div>
        <svg style={graphStyle}>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood floodColor="black" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs> 
          {gridLines}
          {metrics}
          {gridTimestamps}
          <text x="90%" y="90%" textAnchor="middle" fill="white" filter="url(#solid)">
            {Object.keys(this.state.logCounts).length} {this.state.gTime}
          </text>
        </svg>
      </div>
    );
  }
});


module.exports = GlobalLogCounterComponent;
