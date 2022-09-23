const express = require("express"),
  app = express();
require('dotenv').config();
//setting view engine to ejs
app.set("view engine", "ejs");

//route for index page
app.get("/", function (req, res) {
  const pageTitle = 'Home';
  res.render("index", {
    pageTitle: pageTitle
  });
});

//route for magic page
app.get("/magic", function (req, res) {
  const pageTitle = 'Magic';
  res.render("magic", {
    pageTitle: pageTitle
  });
});

app.get("/faction", function (req, res) {
  const pageTitle = 'Faction';
  res.render("faction", {
    pageTitle: pageTitle
  });
});
app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});