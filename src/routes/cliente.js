module.exports = function (bd, app, verifyJWT) {
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
      const cliente = await bd.conn.query(
        "DELETE FROM cliente WHERE nome = $1",
        [nome]
      );
      console.log("Cliente deletado com sucesso!");
      return res.status(200).send(cliente.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
