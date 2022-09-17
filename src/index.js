const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const PORT = 3333;

const pool = new Pool({
  connectionString: `postgres://postgres:postgres@localhost:5432/api_restaurante`,
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.get("/cliente/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cliente");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/cliente/create", async (req, res) => {
  const { nome, cpf, telefone, datanascimento, endereco } = req.body;
  const { id } = req.params;

  try {
    const cliente = await pool.query(
      "INSERT INTO cliente (nome, cpf, telefone, datanascimento, endereco) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco]
    );
    console.log("Cliente cadastrado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/cliente/update", async (req, res) => {
  const { nome, cpf, telefone, datanascimento, endereco, id } = req.body;

  try {
    const cliente = await pool.query(
      "UPDATE cliente SET nome = $1, cpf = $2, telefone = $3, datanascimento = $4, endereco = $5 WHERE id = $6 RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco, id]
    );
    console.log("Cliente atualizado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/cliente/delete", async (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;
  try {
    const cliente = await pool.query("DELETE FROM cliente WHERE nome = $1", [
      nome,
    ]);
    console.log("Cliente deletado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create a CRUD for the table cliente into the database api_restaurante
