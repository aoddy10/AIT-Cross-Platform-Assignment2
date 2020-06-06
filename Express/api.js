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

app.get("/", function (req, res) {
    res.send("Hello World");
});

const jsonFile = "data.json";

function readDataFile() {
    let formulaData;
    let rawdata = fs.readFileSync(jsonFile);
    if (rawdata) formulaData = JSON.parse(rawdata);
    return formulaData;
}

app.get("/formula/all", function (req, res, next) {
    data = readDataFile();
    res.send(data);
});

app.post("/formula/addNew", function (req, res, next) {
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

    let data = readDataFile();

    // add new formula to data
    data.push(formula);
    // save data to jsonfile
    fs.writeFile(jsonFile, JSON.stringify(data), "utf8", (res) => {
        console.log("Update data.json");
    });

    res.set(200).send({ isError: false, message: "Add new formular success" });
});

app.post("/formula/delete", function (req, res, next) {
    if (!req.body) {
        res.set(400).send({ isError: true, message: "Don't have requst data" });
        return;
    }
    let formula = req.body;
    console.log(formula);

    let data = readDataFile();
    console.log(data);

    // remove formula from data
    let i = data.findIndex((item) => item === formula);
    console.log("index", i);
    data.splice(i, 1);
    console.log("delete data succesful.");

    // save data to jsonfile
    fs.writeFile(jsonFile, JSON.stringify(data), "utf8", (res) => {
        console.log("Update data.json");
    });

    res.set(200).send({ isError: false, message: "Delete formular success" });
});

app.listen(5000, function () {
    console.log("CORS-enabled web server listening on port 5000");
});
