require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const subdomain = require('express-subdomain');
var app = express();
const { getFactions, createFaction, findFaction, removeFaction } = require("./database/factionData");
const fs = require("fs");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.info('Mongo Connected');
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.portal = express.Router();
app.use(subdomain('portal', app.portal));


// app.get("/", function (req, res) {
//   res.send('Onichan <3');
// });

app.portal.get("/", function (req, res) {
  res.render("index", {
    pageTitle: 'Home'
  });
});

app.portal.get("/faction", async function (req, res) {
  const factionData = await getFactions();
  //console.log(factionData);
  res.render("faction/faction", {
    pageTitle: 'Faction',
    factions: factionData
  });
});

app.portal.get(["/faction/edit","/faction/remove","/faction/add"], async function (req, res) {
  res.redirect("/faction");
});

app.portal.get("/faction/edit/:id", async function (req, res) {
  const fac = await findFaction(req.params.id);
  if(fac) {
    res.render("faction/facEdit", {
      pageTitle: 'FactionEditor',
      currentData: fac
    });
  } else {
    res.redirect('/');
  }
});

app.portal.get("/faction/remove/:id", async function (req, res) {
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

app.portal.post("/faction/edit", async function (req, res) {
  await createFaction(req.body.facId, req.body.facName, req.body.facTag, new Date());
  res.redirect("/faction");
});

app.portal.post("/faction/remove", async function (req, res) {
  await removeFaction(req.body.facId);
  res.redirect("/faction");
});

app.portal.post("/faction/add", async function (req, res) {
  await createFaction(req.body.facId, req.body.facName, req.body.facTag, new Date());
  res.redirect("/faction");
});

app.portal.get("/staff", async function (req, res) {
  res.render("staff/staff", {
    pageTitle: 'Staff'
  });
});

app.portal.get("/manager", async function (req, res) {
  res.render("manager/manager", {
    pageTitle: 'Manager'
  });
});

app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
  main().catch(err => console.warn(err));
});

// const fdata = require('./factionData.json');
// for (const i in fdata) {
//   createFaction(i,null,fdata[i],new Date());
// }