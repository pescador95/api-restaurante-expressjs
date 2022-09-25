module.exports = function (bd, app, verifyJWT) {
  app.get("/produto/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM produto");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/produto/create", verifyJWT, async (req, res, next) => {
    const {
      idfornecedor,
      nomeproduto,
      tipoproduto,
      descricao,
      quantidade,
      valorunidade,
      datacompra,
    } = req.body;
    const { id } = req.params;

    try {
      const produto = await bd.conn.query(
        "INSERT INTO produto (idfornecedor, nomeproduto, tipoproduto, descricao, quantidade, valorunidade, datacompra) VALUES ($1, $2, $3, $4 ,$5, $6, $7) RETURNING *",
        [
          idfornecedor,
          nomeproduto,
          tipoproduto,
          descricao,
          quantidade,
          valorunidade,
          datacompra,
        ]
      );
      console.log("Produto cadastrado com sucesso!");
      return res.status(200).send(produto.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/produto/update", verifyJWT, async (req, res, next) => {
    const {
      idfornecedor,
      nomeproduto,
      tipoproduto,
      descricao,
      quantidade,
      valorunidade,
      datacompra,
      id,
    } = req.body;

    try {
      const produto = await bd.conn.query(
        "UPDATE produto SET idfornecedor = $1, nomeproduto = $2, tipoproduto = $3, descricao = $4, quantidade = $5, valorunidade = $6, datacompra = $7 WHERE id = $8 RETURNING *",
        [
          idfornecedor,
          nomeproduto,
          tipoproduto,
          descricao,
          quantidade,
          valorunidade,
          datacompra,
          id,
        ]
      );
      console.log("Produto atualizado com sucesso!");
      return res.status(200).send(produto.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/produto/delete", verifyJWT, async (req, res, next) => {
    const { idfornecedor } = req.body;
    const { id } = req.params;
    try {
      const produto = await bd.conn.query("DELETE FROM produto WHERE id = $1", [
        id,
      ]);
      console.log("Produto deletado com sucesso!");
      return res.status(200).send(produto.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
