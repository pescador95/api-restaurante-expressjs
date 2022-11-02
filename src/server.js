const express = require("express");
const dotenv = require("dotenv").config();
const PORT = 3333;
const jwt = require("jsonwebtoken");
const bd = require("./config/bd");
const bodyParser = require("body-parser");
const { Router } = require("express");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "no token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));

module.exports = {
  app,
  verifyJWT,
  bd,
  jwt,
  Router,
  PORT,
  dotenv,
  express,
  cors,
};

require("./routes/auth")(bd, app, jwt, verifyJWT, cors);
require("./routes/cliente")(bd, app, verifyJWT);
require("./routes/funcionario")(bd, app, verifyJWT);
require("./routes/fornecedor")(bd, app, verifyJWT);
require("./routes/estoque")(bd, app, verifyJWT);
require("./routes/pedidocliente")(bd, app, verifyJWT);
require("./routes/pedidofornecedor")(bd, app, verifyJWT);
require("./routes/produto")(bd, app, verifyJWT);
require("./routes/usuario")(bd, app, verifyJWT);
require("./routes/itempedido")(bd, app, verifyJWT);
