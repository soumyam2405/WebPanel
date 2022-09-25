const express = require("express"),
  app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const { getFactions, createFaction } = require("./database/factionData");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.info('Mongo Connected');
}

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const pageTitle = 'Home';
  res.render("index", {
    pageTitle: pageTitle
  });
});

app.get("/magic", function (req, res) {
  const pageTitle = 'Magic';
  res.render("magic", {
    pageTitle: pageTitle
  });
});

app.get("/faction", async function (req, res) {
  const pageTitle = 'Faction';
  const factionData = await getFactions();
  //console.log(factionData);
  res.render("faction", {
    pageTitle: pageTitle,
    factions: factionData
  });
});

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
  main().catch(err => console.warn(err));
});

createFaction(54, 'Transport Security', 'TSA', new Date());