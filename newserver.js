const express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send('portal');
})

app.listen(8081);