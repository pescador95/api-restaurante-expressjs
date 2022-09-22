const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const PORT = 3333;
const jwt = require("jsonwebtoken");
const pool = new Pool({
  connectionString: `postgres://postgres:postgres@localhost:5432/api_restaurante`,
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.post("/login", (req, res, next) => {
  if (req.body.user === "user" && req.body.password === "123") {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 600,
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: "Login inválido" });
});

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

app.get("/cliente/", verifyJWT, async (req, res, next) => {
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
