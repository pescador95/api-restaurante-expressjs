module.exports = function (bd, app, verifyJWT) {
  app.get("/pedidofornecedor/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM pedidofornecedor");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/pedidofornecedor/", verifyJWT, async (req, res, next) => {
    const { numeropedido, idfornecedor, idfuncionario, valortotalpedido } =
      req.body;
    const { id } = req.params;

    try {
      const pedidofornecedor = await bd.conn.query(
        "INSERT INTO pedidofornecedor (numeropedido, idfornecedor, idfuncionario,  valortotalpedido) VALUES ($1, $2, $3, $4) RETURNING *",
        [numeropedido, idfornecedor, idfuncionario, valortotalpedido]
      );
      console.log("Pedido do Fornecedor cadastrado com sucesso!");
      return res.status(200).send(pedidofornecedor.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/pedidofornecedor/", verifyJWT, async (req, res, next) => {
    const { id, numeropedido, idfornecedor, idfuncionario, valortotalpedido } =
      req.body;

    try {
      const pedidofornecedor = await bd.conn.query(
        "UPDATE pedidofornecedor SET numeropedido = $2, idfornecedor = $3, idfuncionario = $4, valortotalpedido = $5 WHERE id = $1 RETURNING *",
        [id, numeropedido, idfornecedor, idfuncionario, valortotalpedido]
      );
      console.log("Pedido do Fornecedor atualizado com sucesso!");
      return res.status(200).send(pedidofornecedor.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/pedidofornecedor/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const pedidofornecedor = bd.conn.query(
          "DELETE FROM pedidofornecedor WHERE id = $1",
          [element]
        );
        console.log("Pedido do Fornecedor deletado com sucesso!");
        return res.status(200).send(pedidofornecedor.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
