const express = require("express");
var cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

let rawdata = fs.readFileSync("data.json");
let record = JSON.parse(rawdata);

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/formula/all", function (req, res, next) {
    res.send(record);
});

app.listen(5000, function () {
    console.log("CORS-enabled web server listening on port 5000");
});
