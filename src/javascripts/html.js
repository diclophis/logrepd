//

var React = require('react');
var MainComponent = require('./main');

var HtmlComponent = React.createClass({

  render: function() {
    //var mainContainerId = this.props.packageModule.toLowerCase() + "-container";

/*
    var entryPoint = function(bootstrap, mainContainer) {
      bootstrap(mainContainer);
    };

    var bootstrapFunction = '(' + entryPoint.toString() + ')';
    var bootstrapInvokation = '(' + this.props.packageModule + ', document.getElementById("' + mainContainerId + '"));';
    var bootstrapSource = (bootstrapFunction + bootstrapInvokation).replace('\n', '');
    <script type="text/javascript" dangerouslySetInnerHTML={{__html:bootstrapSource}}></script>

*/

    return(
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
          <title>Main</title>
          <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
          <script type="text/javascript" dangerouslySetInnerHTML={{__html:'__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};'}}></script>
        </head>
        <body>
          <div id="main-container">
            <MainComponent tree={this.props.treeInbound}/>
          </div>
          <script type="text/javascript" src={this.props.js}></script>
        </body>
      </html>
    );
  }
});


module.exports = HtmlComponent;
