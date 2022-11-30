module.exports = function (bd, app, verifyJWT) {
  app.get("/produto/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM produto");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/produto/", verifyJWT, async (req, res, next) => {
    const {
      nomeproduto,
      idfornecedor,
      tipoproduto,
      descricao,
      valorunidade,
      datacompra,
    } = {
      idfornecedor: req.body.idfornecedor,
      nomeproduto: req.body.nomeproduto,
      tipoproduto: req.body.tipoproduto,
      descricao: req.body.descricao,
      valorunidade: req.body.valorunidade,
      datacompra: req.body.datacompra,
    };

    app.get("/produto/count", verifyJWT, async (req, res, next) => {
      try {
        const { rows } = await bd.conn.query("SELECT COUNT(id) FROM produto");
        return res.status(200).send(rows[0]);
      } catch (err) {
        return res.status(400).send(err);
      }
    });

    try {
      const produto = await bd.conn.query(
        "INSERT INTO produto (idfornecedor, nomeproduto, tipoproduto, descricao, valorunidade, datacompra) VALUES ($1, $2, $3, $4 ,$5, $6) RETURNING *",
        [
          idfornecedor,
          nomeproduto,
          tipoproduto,
          descricao,
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

  app.get("/produto/count", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT COUNT(id) FROM produto");
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/produto/", verifyJWT, async (req, res, next) => {
    const {
      id,
      idfornecedor,
      nomeproduto,
      tipoproduto,
      descricao,
      valorunidade,
      datacompra,
    } = req.body;

    try {
      const produto = await bd.conn.query(
        "UPDATE produto SET idfornecedor = $2, nomeproduto = $3, tipoproduto = $4, descricao = $5, valorunidade = $6, datacompra = $7 WHERE id = $1 RETURNING *",
        [
          id,
          idfornecedor,
          nomeproduto,
          tipoproduto,
          descricao,
          valorunidade,
          datacompra,
        ]
      );
      console.log("Produto atualizado com sucesso!");
      return res.status(200).send(produto.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/produto/", verifyJWT, async (req, res, next) => {
    const { id } = { id: req.body };
    try {
      await id.forEach((element) => {
        const produto = bd.conn.query("DELETE FROM produto WHERE = $1", [
          element,
        ]);
        console.log("Produto deletado com sucesso!");
        return res.status(200).send(produto.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
