module.exports = function (bd, app, verifyJWT) {
  app.get("/cliente/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM cliente");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.get("/cliente/:id", verifyJWT, async (req, res, next) => {
    const { id } = req.params.id;
    try {
      const { rows } = await bd.conn.query(
        "SELECT * FROM cliente WHERE id = $1",
        [id]
      );
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/cliente/", verifyJWT, async (req, res, next) => {
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

  app.put("/cliente/", verifyJWT, async (req, res, next) => {
    const { id, nome, cpf, telefone, datanascimento, endereco } = req.body;

    try {
      const cliente = await bd.conn.query(
        "UPDATE cliente SET nome = $2, cpf = $3, telefone = $4, datanascimento = $5, endereco = $6 WHERE id = $1 RETURNING *",
        [id, nome, cpf, telefone, datanascimento, endereco]
      );
      console.log("Cliente atualizado com sucesso!");
      return res.status(200).send(cliente.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/cliente/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const cliente = bd.conn.query("DELETE FROM cliente WHERE id = $1", [
          element,
        ]);
        console.log("Cliente deletado com sucesso!");
        return res.status(200).send(cliente.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
