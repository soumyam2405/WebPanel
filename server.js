const express = require("express"),
  app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const { getFactions, createFaction, findFaction, removeFaction } = require("./database/factionData");
const fs = require("fs");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.info('Mongo Connected');
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

http.createServer({
 key: fs.readFileSync('/etc/letsencrypt/live/portal.tycoonstats.com/privkey.pem'),
 cert: fs.readFileSync('/etc/letsencrypt/live/portal.tycoonstats.com/cert.pem')
}, app);

app.get("/", function (req, res) {
  res.render("index", {
    pageTitle: 'Home'
  });
});

app.get("/faction", async function (req, res) {
  const factionData = await getFactions();
  //console.log(factionData);
  res.render("faction/faction", {
    pageTitle: 'Faction',
    factions: factionData
  });
});

app.get(["/faction/edit","/faction/remove","/faction/add"], async function (req, res) {
  res.redirect("/faction");
});

app.get("/faction/edit/:id", async function (req, res) {
  const fac = await findFaction(req.params.id);
  if(fac) {
    res.render("facEdit", {
      pageTitle: 'FactionEditor',
      currentData: fac
    });
  } else {
    res.redirect('/');
  }
});

app.get("/faction/remove/:id", async function (req, res) {
  const fac = await findFaction(req.params.id);
  if(fac) {
    res.render("faction/facRemove", {
      pageTitle: 'Faction Remover',
      currentData: fac
    });
  } else {
    res.redirect('/');
  }
});

app.post("/faction/edit", async function (req, res) {
  await createFaction(req.body.facId, req.body.facName, req.body.facTag, new Date());
  res.redirect("/faction");
});

app.post("/faction/remove", async function (req, res) {
  await removeFaction(req.body.facId);
  res.redirect("/faction");
});

app.post("/faction/add", async function (req, res) {
  await createFaction(req.body.facId, req.body.facName, req.body.facTag, new Date());
  res.redirect("/faction");
});

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
  main().catch(err => console.warn(err));
});

// const fdata = require('./factionData.json');
// for (const i in fdata) {
//   createFaction(i,null,fdata[i],new Date());
// }