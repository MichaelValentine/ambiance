var ejs = require("ejs");
var express = require("express");
var morgan = require("morgan");

var app = express();
app.use(morgan("dev"));
app.engine("html", ejs.renderFile);
app.use("/dist", express.static(__dirname + "/dist"));
app.set("views", __dirname+"/dist");

app.use("*", function(req, res) {
    res.render("index.html");
});

app.listen(49996, function() {
    console.log("Request Forms App is running on port %d", 49996);
});
