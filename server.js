const express = require("express"),
  app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const { getFactions, createFaction, findFaction, removeFaction } = require("./database/factionData");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.info('Mongo Connected');
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index", {
    pageTitle: 'Home'
  });
});

app.get("/magic", function (req, res) {
  res.render("magic", {
    pageTitle: 'Magic'
  });
});

app.get("/faction", async function (req, res) {
  const factionData = await getFactions();
  //console.log(factionData);
  res.render("faction", {
    pageTitle: 'Faction',
    factions: factionData
  });
});

app.get("/faction/edit", async function (req, res) {
  res.send("Go Away :)");
});

app.get("/faction/remove", async function (req, res) {
  res.send("Go Away :)");
});

app.get("/faction/edit/:id", async function (req, res) {
  const fac = await findFaction(req.params.id);
  if(fac) {
    res.render("fac_edit", {
      pageTitle: 'FactionEditor',
      currentData: fac
    });
  } else {
    res.send('Error: No faction with that ID found! Go back to <a href="/faction">Faction</a>');
  }
});

app.post("/faction/edit", async function (req, res) {
  await createFaction(req.body.facId, req.body.facName, req.body.facTag, new Date());
  res.redirect("/faction");
});

app.get("/faction/remove/:id", async function (req, res) {
  const fac = await findFaction(req.params.id);
  if(fac) {
    res.render("fac_remove", {
      pageTitle: 'Faction Remover',
      currentData: fac
    });
  } else {
    res.send('Error: No faction with that ID found! Go back to <a href="/faction">Faction</a>');
  }
});

app.post("/faction/remove", async function (req, res) {
  await removeFaction(req.body.id);
  res.redirect("/faction");
})

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
  main().catch(err => console.warn(err));
});
