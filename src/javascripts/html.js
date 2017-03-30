//

var React = require('react');
var MainComponent = require('./main');


var HtmlComponent = React.createClass({
  render: function() {
    var mainContainerId = this.props.packageModule.toLowerCase() + "-container";

    var bootstrapFunction = '(' + entryPoint.toString() + ')';
    var bootstrapInvokation = '(' + this.props.packageModule + ', document.getElementById("' + mainContainerId + '"));';
    var bootstrapSource = (bootstrapFunction + bootstrapInvokation).replace('\n', '');

    return(
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
          <title>Index</title>
          <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
        </head>
        <body>
          <div id={mainContainerId} className="static">
            <MainComponent />
          </div>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html:'__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};'}}></script>
          <script type="text/javascript" src={this.props.js}></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html:bootstrapSource}}></script>
        </body>
      </html>
    );
  }
});


module.exports = HtmlComponent;
