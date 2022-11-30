module.exports = function (bd, app, verifyJWT) {
  app.get("/pedidocliente/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM pedidocliente");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/pedidocliente/", verifyJWT, async (req, res, next) => {
    const { idcliente, idfuncionario, valortotalpedido } = req.body;
    const { id } = req.params;

    try {
      const pedidocliente = await bd.conn.query(
        "INSERT INTO pedidocliente ( idcliente, idfuncionario, valortotalpedido, datapedido) VALUES ($1, $2, $3, NOW()) RETURNING *",
        [idcliente, idfuncionario, valortotalpedido]
      );
      console.log("Pedido do Cliente cadastrado com sucesso!");
      return res.status(200).send(pedidocliente.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.get("/pedidocliente/count", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query(
        "SELECT COUNT(id) FROM pedidocliente"
      );
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/pedidocliente/", verifyJWT, async (req, res, next) => {
    const { id, idcliente, idfuncionario, valortotalpedido } = req.body;

    try {
      const pedidocliente = await bd.conn.query(
        "UPDATE pedidocliente SET idcliente = $2, idfuncionario = $3, valortotalpedido = $4 WHERE id = $1 RETURNING *",
        [id, idcliente, idfuncionario, valortotalpedido]
      );
      console.log("Pedido do Cliente atualizado com sucesso!");
      return res.status(200).send(pedidocliente.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/pedidocliente/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const pedidocliente = bd.conn.query(
          "DELETE FROM pedidocliente WHERE id = $1",
          [element]
        );
        console.log("Pedido do Cliente deletado com sucesso!");
        return res.status(200).send(pedidocliente.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
