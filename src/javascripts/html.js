//

var React = require("react");
var MainComponent = require("./main");

var HtmlComponent = React.createClass({
  render: function() {
    var style = {
      background: "black",
      fontFamily: "monospace"
    };

    return (
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
          <title>Main</title>
          <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: "__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};"
            }}
          />
        </head>
        <body style={style}>
          <div id="main-container">
            <MainComponent tree={this.props.treeInbound} />
          </div>
          <script type="text/javascript" src={this.props.js} />
        </body>
      </html>
    );
  }
});

module.exports = HtmlComponent;
