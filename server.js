const express = require("express");

const bodyParser = require("body-parser");

const conn = require("./src/config/bd");

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(5000, function () {
  console.log("Api rodando na porta 5000.");
});
