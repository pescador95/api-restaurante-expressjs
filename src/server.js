const express = require("express");
require("dotenv").config();
const PORT = 3333;
const jwt = require("jsonwebtoken");
const bd = require("./config/bd");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/login", async (req, res, next) => {
  let login = req.body.login;
  let senha = req.body.senha;
  try {
    const { rows } = await bd.conn.query(
      "SELECT * FROM usuario WHERE login = $1 AND senha = $2",
      [login, senha]
    );
    if (rows) {
      const id = rows[0].id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 600,
      });
      return res.json({ auth: true, token: token });
    }
  } catch (err) {
    res.status(500).json({ message: "Credenciais incorretas." });
  }
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

app.get("/usuario/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM usuario");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/usuario/create", verifyJWT, async (req, res, next) => {
  const { login, senha, idfuncionario } = req.body;
  const { id } = req.params;

  try {
    const usuario = await bd.conn.query(
      "INSERT INTO usuario (login, senha, idfuncionario) VALUES ($1, $2, $3) RETURNING *",
      [login, senha, idfuncionario]
    );
    console.log("usuario cadastrado com sucesso!");
    return res.status(200).send(usuario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/usuario/update", verifyJWT, async (req, res, next) => {
  const { login, senha, idfuncionario, id } = req.body;

  try {
    const usuario = await bd.conn.query(
      "UPDATE usuario SET login = $1, senha = $2, idfuncionario = $3 WHERE id = $4 RETURNING *",
      [login, senha, idfuncionario, id]
    );
    console.log("usuario atualizado com sucesso!");
    return res.status(200).send(usuario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/usuario/delete", verifyJWT, async (req, res, next) => {
  const { login } = req.body;
  const { id } = req.params;
  try {
    const usuario = await bd.conn.query(
      "DELETE FROM usuario WHERE login = $1",
      [login]
    );
    console.log("usuario deletado com sucesso!");
    return res.status(200).send(usuario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/cliente/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM cliente");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/cliente/create", verifyJWT, async (req, res, next) => {
  const { nome, cpf, telefone, datanascimento, endereco } = req.body;
  const { id } = req.params;

  try {
    const cliente = await bd.conn.query(
      "INSERT INTO cliente (nome, cpf, telefone, datanascimento, endereco) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco]
    );
    console.log("Cliente cadastrado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/cliente/update", verifyJWT, async (req, res, next) => {
  const { nome, cpf, telefone, datanascimento, endereco, id } = req.body;

  try {
    const cliente = await bd.conn.query(
      "UPDATE cliente SET nome = $1, cpf = $2, telefone = $3, datanascimento = $4, endereco = $5 WHERE id = $6 RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco, id]
    );
    console.log("Cliente atualizado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/cliente/delete", verifyJWT, async (req, res, next) => {
  const { nome } = req.body;
  const { id } = req.params;
  try {
    const cliente = await bd.conn.query("DELETE FROM cliente WHERE nome = $1", [
      nome,
    ]);
    console.log("Cliente deletado com sucesso!");
    return res.status(200).send(cliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/estoque/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM estoque");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/estoque/create", verifyJWT, async (req, res, next) => {
  const { idproduto, itemestoque, quantidadeitem, valorunidade } = req.body;
  const { id } = req.params;

  try {
    const estoque = await bd.conn.query(
      "INSERT INTO estoque (idproduto, itemestoque, quantidadeitem, valorunidade) VALUES ($1, $2, $3, $4) RETURNING *",
      [idproduto, itemestoque, quantidadeitem, valorunidade]
    );
    console.log("Estoque cadastrado com sucesso!");
    return res.status(200).send(estoque.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/estoque/update", verifyJWT, async (req, res, next) => {
  const { idproduto, itemestoque, quantidadeitem, valorunidade, id } = req.body;

  try {
    const estoque = await bd.conn.query(
      "UPDATE estoque SET idproduto = $1, itemestoque = $2, quantidadeitem = $3, valorunidade = $4 WHERE id = $5 RETURNING *",
      [idproduto, itemestoque, quantidadeitem, valorunidade, id]
    );
    console.log("Estoque atualizado com sucesso!");
    return res.status(200).send(estoque.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/estoque/delete", verifyJWT, async (req, res, next) => {
  const { idproduto } = req.body;
  const { id } = req.params;
  try {
    const estoque = await bd.conn.query(
      "DELETE FROM estoque WHERE idproduto = $1",
      [idproduto]
    );
    console.log("Estoque deletado com sucesso!");
    return res.status(200).send(estoque.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/fornecedor/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM fornecedor");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/fornecedor/create", verifyJWT, async (req, res, next) => {
  const { nomefornecedor, cnpj } = req.body;
  const { id } = req.params;

  try {
    const fornecedor = await bd.conn.query(
      "INSERT INTO fornecedor (nomefornecedor, cnpj ) VALUES ($1, $2) RETURNING *",
      [nomefornecedor, cnpj]
    );
    console.log("Fornecedor cadastrado com sucesso!");
    return res.status(200).send(fornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/fornecedor/update", verifyJWT, async (req, res, next) => {
  const { nomefornecedor, cnpj, id } = req.body;

  try {
    const fornecedor = await bd.conn.query(
      "UPDATE fornecedor SET nomefornecedor = $1, cnpj = $2, WHERE id = $3 RETURNING *",
      [nomefornecedor, cnpj, id]
    );
    console.log("Fornecedor atualizado com sucesso!");
    return res.status(200).send(fornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/fornecedor/delete", verifyJWT, async (req, res, next) => {
  const { nomefornecedor } = req.body;
  const { id } = req.params;
  try {
    const fornecedor = await bd.conn.query(
      "DELETE FROM fornecedor WHERE nomefornecedor = $1",
      [nomefornecedor]
    );
    console.log("Fornecedor deletado com sucesso!");
    return res.status(200).send(fornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/pedidocliente/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM pedidocliente");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/pedidocliente/create", verifyJWT, async (req, res, next) => {
  const {
    numeropedido,
    idcliente,
    idfuncionario,
    idproduto,
    quantidadeitem,
    valorunidade,
  } = req.body;
  const { id } = req.params;

  try {
    const pedidocliente = await bd.conn.query(
      "INSERT INTO pedidocliente (numeropedido, idcliente, idfuncionario, idproduto, quantidadeitem, valorunidade) VALUES ($1, $2, $3, $4 ,$5, $6) RETURNING *",
      [
        numeropedido,
        idcliente,
        idfuncionario,
        idproduto,
        quantidadeitem,
        valorunidade,
      ]
    );
    console.log("Pedido do Cliente cadastrado com sucesso!");
    return res.status(200).send(pedidocliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/pedidocliente/update", verifyJWT, async (req, res, next) => {
  const {
    numeropedido,
    idcliente,
    idfuncionario,
    idproduto,
    quantidadeitem,
    valorunidade,
    id,
  } = req.body;

  try {
    const pedidocliente = await bd.conn.query(
      "UPDATE pedidocliente SET numeropedido = $1, idcliente = $2, idfuncionario = $3, idproduto = $4, quantidadeitem = $5, valorunidade = $6 WHERE id = $7 RETURNING *",
      [
        numeropedido,
        idcliente,
        idfuncionario,
        idproduto,
        quantidadeitem,
        valorunidade,
        id,
      ]
    );
    console.log("Pedido do Cliente atualizado com sucesso!");
    return res.status(200).send(pedidocliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/pedidocliente/delete", verifyJWT, async (req, res, next) => {
  const { numeropedido } = req.body;
  const { id } = req.params;
  try {
    const pedidocliente = await bd.conn.query(
      "DELETE FROM pedidocliente WHERE numeropedido = $1",
      [numeropedido]
    );
    console.log("Pedido do Cliente deletado com sucesso!");
    return res.status(200).send(pedidocliente.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/pedidofornecedor/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM pedidofornecedor");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/pedidofornecedor/create", verifyJWT, async (req, res, next) => {
  const {
    numeropedido,
    idfornecedor,
    idfuncionario,
    idproduto,
    quantidadeitem,
    valorunidade,
  } = req.body;
  const { id } = req.params;

  try {
    const pedidofornecedor = await bd.conn.query(
      "INSERT INTO pedidofornecedor (numeropedido, idfornecedor, idfuncionario, idproduto, quantidadeitem, valorunidade) VALUES ($1, $2, $3, $4 ,$5, $6) RETURNING *",
      [
        numeropedido,
        idfornecedor,
        idfuncionario,
        idproduto,
        quantidadeitem,
        valorunidade,
      ]
    );
    console.log("Pedido do Fornecedor cadastrado com sucesso!");
    return res.status(200).send(pedidofornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/pedidofornecedor/update", verifyJWT, async (req, res, next) => {
  const {
    numeropedido,
    idfornecedor,
    idfuncionario,
    idproduto,
    quantidadeitem,
    valorunidade,
    id,
  } = req.body;

  try {
    const pedidofornecedor = await bd.conn.query(
      "UPDATE pedidofornecedor SET numeropedido = $1, idfornecedor = $2, idfuncionario = $3, idproduto = $4, quantidadeproduto = $5, valorunidade = $6 WHERE id = $7 RETURNING *",
      [
        numeropedido,
        idfornecedor,
        idfuncionario,
        idproduto,
        quantidadeitem,
        valorunidade,
        id,
      ]
    );
    console.log("Pedido do Fornecedor atualizado com sucesso!");
    return res.status(200).send(pedidofornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/pedidofornecedor/delete", verifyJWT, async (req, res, next) => {
  const { numeropedido } = req.body;
  const { id } = req.params;
  try {
    const pedidofornecedor = await bd.conn.query(
      "DELETE FROM pedidofornecedor WHERE numeropedido = $1",
      [numeropedido]
    );
    console.log("Pedido do Fornecedor deletado com sucesso!");
    return res.status(200).send(pedidofornecedor.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/produto/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM produto");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/produto/create", verifyJWT, async (req, res, next) => {
  const {
    idfornecedor,
    nomeproduto,
    tipoproduto,
    descricao,
    quantidade,
    valorunidade,
    datacompra,
  } = req.body;
  const { id } = req.params;

  try {
    const produto = await bd.conn.query(
      "INSERT INTO produto (idfornecedor, nomeproduto, tipoproduto, descricao, quantidade, valorunidade, datacompra) VALUES ($1, $2, $3, $4 ,$5, $6, $7) RETURNING *",
      [
        idfornecedor,
        nomeproduto,
        tipoproduto,
        descricao,
        quantidade,
        valorunidade,
        datacompra,
      ]
    );
    console.log("Produto cadastrado com sucesso!");
    return res.status(200).send(produto.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/produto/update", verifyJWT, async (req, res, next) => {
  const {
    idfornecedor,
    nomeproduto,
    tipoproduto,
    descricao,
    quantidade,
    valorunidade,
    datacompra,
    id,
  } = req.body;

  try {
    const produto = await bd.conn.query(
      "UPDATE produto SET idfornecedor = $1, nomeproduto = $2, tipoproduto = $3, descricao = $4, quantidade = $5, valorunidade = $6, datacompra = $7 WHERE id = $8 RETURNING *",
      [
        idfornecedor,
        nomeproduto,
        tipoproduto,
        descricao,
        quantidade,
        valorunidade,
        datacompra,
        id,
      ]
    );
    console.log("Produto atualizado com sucesso!");
    return res.status(200).send(produto.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/produto/delete", verifyJWT, async (req, res, next) => {
  const { idfornecedor } = req.body;
  const { id } = req.params;
  try {
    const produto = await bd.conn.query("DELETE FROM produto WHERE id = $1", [
      id,
    ]);
    console.log("Produto deletado com sucesso!");
    return res.status(200).send(produto.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/funcionario/", verifyJWT, async (req, res, next) => {
  try {
    const { rows } = await bd.conn.query("SELECT * FROM funcionario");
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/funcionario/create", verifyJWT, async (req, res, next) => {
  const { nome, cpf, telefone, datanascimento, endereco } = req.body;
  const { id } = req.params;

  try {
    const funcionario = await bd.conn.query(
      "INSERT INTO funcionario (nome, cpf, telefone, datanascimento, endereco) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco]
    );
    console.log("funcionario cadastrado com sucesso!");
    return res.status(200).send(funcionario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/funcionario/update", verifyJWT, async (req, res, next) => {
  const { nome, cpf, telefone, datanascimento, endereco, id } = req.body;

  try {
    const funcionario = await bd.conn.query(
      "UPDATE funcionario SET nome = $1, cpf = $2, telefone = $3, datanascimento = $4, endereco = $5 WHERE id = $6 RETURNING *",
      [nome, cpf, telefone, datanascimento, endereco, id]
    );
    console.log("funcionario atualizado com sucesso!");
    return res.status(200).send(funcionario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/funcionario/delete", verifyJWT, async (req, res, next) => {
  const { nome } = req.body;
  const { id } = req.params;
  try {
    const funcionario = await bd.conn.query(
      "DELETE FROM funcionario WHERE nome = $1",
      [nome]
    );
    console.log("funcionario deletado com sucesso!");
    return res.status(200).send(funcionario.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app };
