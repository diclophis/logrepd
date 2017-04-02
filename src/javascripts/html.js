//

var React = require('react');
var MainComponent = require('./main');
var treeMixins = require('baobab-react/mixins');


var HtmlComponent = React.createClass({
  mixins: [treeMixins.root],

  render: function() {
    var mainContainerId = this.props.packageModule.toLowerCase() + "-container";

    var entryPoint = function(bootstrap, mainContainer) {
      bootstrap(mainContainer);
    };

    var bootstrapFunction = '(' + entryPoint.toString() + ')';
    var bootstrapInvokation = '(' + this.props.packageModule + ', document.getElementById("' + mainContainerId + '"));';
    var bootstrapSource = (bootstrapFunction + bootstrapInvokation).replace('\n', '');

    return(
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
          <title>Main</title>
          <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
        </head>
        <body>
          <div id={mainContainerId}>
            <MainComponent />
          </div>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html:'__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};'}}></script>
        </body>
        <script type="text/javascript" src={this.props.js}></script>
        <script type="text/javascript" dangerouslySetInnerHTML={{__html:bootstrapSource}}></script>
      </html>
    );
  }
});


module.exports = HtmlComponent;
