module.exports = function (bd, app, verifyJWT) {
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
};
