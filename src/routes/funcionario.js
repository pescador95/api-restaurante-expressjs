module.exports = function (bd, app, verifyJWT) {
  app.get("/funcionario/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM funcionario");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/funcionario/", verifyJWT, async (req, res, next) => {
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

  app.get("/funcionario/count", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT COUNT(id) FROM funcionario");
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/funcionario/", verifyJWT, async (req, res, next) => {
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

  app.delete("/funcionario/", verifyJWT, async (req, res, next) => {
    const { id } = { id: req.body };
    try {
      await id.forEach((element) => {
        const funcionario = bd.conn.query(
          "DELETE FROM funcionario WHERE id = $1",
          [element]
        );
        console.log("funcionario deletado com sucesso!");
        return res.status(200).send(funcionario.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
