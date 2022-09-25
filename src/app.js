const express = require("express");
require("dotenv").config();
const PORT = 3333;
const jwt = require("jsonwebtoken");
const bd = require("./config/bd");
const bodyParser = require("body-parser");
const { Router } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.json());
app.use(Router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app };
