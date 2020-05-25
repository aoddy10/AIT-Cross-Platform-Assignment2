const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let rawdata = fs.readFileSync("data.json");
let formulaData = JSON.parse(rawdata);

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/formula/all", function (req, res, next) {
    res.send(formulaData);
});

app.post("/addNewFormula", function (req, res, next) {
    if (!req.body) {
        res.set(400).send({ isError: true, message: "Don't have requst data" });
        return;
    }
    let formula = req.body;

    // validate data
    if (
        formula.name == "" ||
        formula.equation == "" ||
        formula.variables.length <= 0
    ) {
        res.set(400).send({ isError: true, message: "Invalid requst data" });
        return;
    }

    // add new formula to data
    formulaData.push(formula);

    res.set(200).send({ isError: false, message: "Add new formular success" });
});

app.listen(5000, function () {
    console.log("CORS-enabled web server listening on port 5000");
});
