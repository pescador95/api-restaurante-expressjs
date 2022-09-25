module.exports = function (bd, app, verifyJWT) {
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
};
