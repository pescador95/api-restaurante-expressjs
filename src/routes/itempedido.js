module.exports = function (bd, app, verifyJWT) {
  app.get("/itempedido/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM ITEMPEDIDO");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.get("/itempedido/:id", verifyJWT, async (req, res, next) => {
    const { pedidocliente } = req.params;
    try {
      const { rows } = await bd.conn.query(
        "SELECT * FROM itempedido WHERE pedidocliente = $1",
        [pedidocliente]
      );
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/itempedido/", verifyJWT, async (req, res, next) => {
    const {
      idpedidocliente,
      idpedidofornecedor,
      idproduto,
      quantidade,
      valorunitario,
      pedidocliente,
    } = req.body;
    const { id } = req.params;

    try {
      const itempedido = await bd.conn.query(
        "INSERT INTO itempedido (idpedidocliente, idpedidofornecedor, idproduto, quantidade, valorunitario, pedidocliente) VALUES ($1, $2, $3, $4 ,$5, $6) RETURNING *",
        [
          idpedidocliente,
          idpedidofornecedor,
          idproduto,
          quantidade,
          valorunitario,
          pedidocliente,
        ]
      );
      console.log("Pedido do Cliente cadastrado com sucesso!");
      return res.status(200).send(itempedido.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/itempedido/", verifyJWT, async (req, res, next) => {
    const {
      id,
      idpedidocliente,
      idpedidofornecedor,
      idproduto,
      quantidade,
      valorunitario,
      pedidocliente,
    } = req.body;

    try {
      const itempedido = await bd.conn.query(
        "UPDATE itempedido SET idpedidocliente = $2, idpedidofornecedor = $3, idproduto = $4, quantidade = $5, valorunitario = $6, pedidocliente = $7 WHERE id = $1 RETURNING *",
        [
          id,
          idpedidocliente,
          idpedidofornecedor,
          idproduto,
          quantidade,
          valorunitario,
          pedidocliente,
        ]
      );
      return res.status(200).send(itempedido.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/itempedido/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const itempedido = bd.conn.query(
          "DELETE FROM itempedido WHERE id = $1",
          [element]
        );
        return res.status(200).send(itempedido.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
