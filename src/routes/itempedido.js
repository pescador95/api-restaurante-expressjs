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
      pedidocliente,
    } = req.body;
    const operacao = pedidocliente ? "-" : "+";
    const tipopedido = pedidocliente ? "pedidocliente" : "pedidofornecedor";
    const idpedido = pedidocliente ? "idpedidocliente" : "idpedidofornecedor";
    const idclientefornecedor = pedidocliente ? "idcliente" : "idfornecedor";
    const idpedidovalue = pedidocliente ? idpedidocliente : idpedidofornecedor;
    try {
      const itempedido = await bd.conn.query(
        "INSERT INTO itempedido (idpedidocliente, idpedidofornecedor, idproduto, quantidade, valorunitario, pedidocliente) VALUES ($1, $2, $3, $4, (select distinct produto.valorunidade from produto join itempedido on itempedido.idproduto = produto.id where itempedido.idproduto = produto.id), $5) RETURNING *",
        [
          idpedidocliente,
          idpedidofornecedor,
          idproduto,
          quantidade,
          pedidocliente,
        ]
      );
      const estoque = await bd.conn.query(
        "UPDATE estoque SET (quantidade) = (select SUM(estoque.quantidade " +
          operacao +
          " " +
          quantidade +
          ") from estoque join produto on estoque.idproduto = produto.id where estoque.idproduto = produto.id) where idproduto = $1 RETURNING *",
        [idproduto]
      );
      const valortotalpedido = await bd.conn.query(
        "UPDATE " +
          tipopedido +
          " SET valortotalpedido = (select SUM(valorunitario * quantidade) from itempedido where " +
          idpedido +
          " = " +
          idpedidovalue +
          ") where id = " +
          idpedidovalue +
          " RETURNING *"
      );
      console.log("Pedido do Cliente cadastrado com sucesso!");
      return res
        .status(200)
        .send(valortotalpedido.rows, itempedido.rows, estoque.rows);
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
      valorunidade,
      pedidocliente,
    } = req.body;
    const operacao = pedidocliente ? "-" : "+";
    const tipopedido = pedidocliente ? "pedidocliente" : "pedidofornecedor";
    const idpedido = pedidocliente ? "idpedidocliente" : "idpedidofornecedor";
    const idclientefornecedor = pedidocliente ? "idcliente" : "idfornecedor";
    const idpedidovalue = pedidocliente ? idpedidocliente : idpedidofornecedor;
    try {
      const itempedido = await bd.conn.query(
        "UPDATE itempedido SET idpedidocliente = $2, idpedidofornecedor = $3, idproduto = $4, quantidade = $5, pedidocliente = $6 WHERE id = $1 RETURNING *",
        [
          id,
          idpedidocliente,
          idpedidofornecedor,
          idproduto,
          quantidade,
          valorunidade,
          pedidocliente,
        ]
      );
      const estoque = await bd.conn.query(
        "UPDATE estoque SET (quantidade) = (select SUM(estoque.quantidade " +
          operacao +
          " " +
          quantidade +
          ") from estoque join produto on estoque.idproduto = produto.id where estoque.idproduto = produto.id) where idproduto = $1 RETURNING *",
        [idproduto]
      );
      const valortotalpedido = await bd.conn.query(
        "UPDATE " +
          tipopedido +
          " SET valortotalpedido = (select SUM(valorunitario * quantidade) from itempedido where " +
          idpedido +
          " = " +
          idpedidovalue +
          ") where id = " +
          idpedidovalue +
          " RETURNING *"
      );
      return res
        .status(200)
        .send(itempedido.rows, estoque.rows, valortotalpedido.rows);
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
