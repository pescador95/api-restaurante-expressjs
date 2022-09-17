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

app.get("/cliente", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cliente");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/cliente", async (req, res) => {
  const { nome, cpf, telefone, datanascimento, endereco } = req.body;
  let cliente = "";
  try {
    cliente = await pool.query("SELECT * FROM cliente WHERE nome = $1", [nome]);
    if (!cliente.rows[0]) {
      cliente = await pool.query(
        "INSERT INTO cliente (nome, cpf, telefone, datanascimento, endereco) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
        [nome, cpf, telefone, datanascimento, endereco]
      );
    }
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create a insert query to insert a new cliente into the database
