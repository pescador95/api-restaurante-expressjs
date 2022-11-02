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
    const { numeropedido, idcliente, idfuncionario, valortotalpedido } =
      req.body;
    const { id } = req.params;

    try {
      const pedidocliente = await bd.conn.query(
        "INSERT INTO pedidocliente (numeropedido, idcliente, idfuncionario valortotalpedido) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
        [numeropedido, idcliente, idfuncionario, valortotalpedido]
      );
      console.log("Pedido do Cliente cadastrado com sucesso!");
      return res.status(200).send(pedidocliente.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/pedidocliente/", verifyJWT, async (req, res, next) => {
    const { id, numeropedido, idcliente, idfuncionario, valortotalpedido } =
      req.body;

    try {
      const pedidocliente = await bd.conn.query(
        "UPDATE pedidocliente SET numeropedido = $2, idcliente = $3, idfuncionario = $4, valortotalpedido = $5 WHERE id = $1 RETURNING *",
        [id, numeropedido, idcliente, idfuncionario, valortotalpedido]
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
