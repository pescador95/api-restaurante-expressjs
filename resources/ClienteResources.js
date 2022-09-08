const express = require("express");
const app = express();
//const cliente = require("../models/ClienteModel");
app.use(express.json());

app.get("/cliente", (req, res, next) => {
  const { nomeCliente, telefone, cpf, numeroPedido } = req.body;
  res.send(req.body);
  res.sendStatus(200);
});

app.post("/cliente", (req, res, next) => {
  const { nomeCliente, telefone, cpf, numeroPedido } = req.body;
  res.send(req.body);
  res.sendStatus(200);
});

app.listen(3000);
