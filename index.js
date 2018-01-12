// logrepd

var process = require("process");
var express = require("express");

var backend = require("./src/javascripts/backend");
var hydrate = require("./src/javascripts/hydrate");
var globalStateTree = require("./src/javascripts/global-state-tree")(); // 1/2 locations, for server-side
var webpackAssetCompilation = require("./src/javascripts/webpack-asset-compilation");

var databaseName = process.env["PG_DATABASE"] || "fluentd";
var tableName = process.env["FLUENTD_TABLE"] || "fluentd";
var httpPort = process.env.PORT || 3001;
var postgresUrl =
  process.env.LOGREPD_POSTGRES_URL ||
  "postgres://" +
    process.env["PG_USERNAME"] +
    ":" +
    process.env["PG_PASSWORD"] +
    "@" +
    process.env["PG_HOST"] +
    "/" +
    databaseName;

// backend data fetching is in this module
var backendStarted = backend.createConnection(
  postgresUrl,
  tableName,
  globalStateTree
);

var app = express();
// fetches the given cursor location from the global state tree
// TODO: figure out express.use
var webpackDotConfig = globalStateTree.get("webpackDotConfig");

app.use(webpackAssetCompilation.createService(webpackDotConfig));
app.get("/hydrate/*", hydrate.createService(globalStateTree));
app.get("", backend.createStaticIndexServer(globalStateTree));

var expressServer = app.listen(httpPort, 32, function() {
  console.log("Listening for web on httpPort", httpPort);
});
