module.exports = function (bd, app, verifyJWT) {
  app.get("/estoque/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM estoque");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/estoque/create", verifyJWT, async (req, res, next) => {
    const { idproduto, itemestoque, quantidadeitem, valorunidade } = req.body;
    const { id } = req.params;

    try {
      const estoque = await bd.conn.query(
        "INSERT INTO estoque (idproduto, itemestoque, quantidadeitem, valorunidade) VALUES ($1, $2, $3, $4) RETURNING *",
        [idproduto, itemestoque, quantidadeitem, valorunidade]
      );
      console.log("Estoque cadastrado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/estoque/update", verifyJWT, async (req, res, next) => {
    const { idproduto, itemestoque, quantidadeitem, valorunidade, id } =
      req.body;

    try {
      const estoque = await bd.conn.query(
        "UPDATE estoque SET idproduto = $1, itemestoque = $2, quantidadeitem = $3, valorunidade = $4 WHERE id = $5 RETURNING *",
        [idproduto, itemestoque, quantidadeitem, valorunidade, id]
      );
      console.log("Estoque atualizado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/estoque/delete", verifyJWT, async (req, res, next) => {
    const { idproduto } = req.body;
    const { id } = req.params;
    try {
      const estoque = await bd.conn.query(
        "DELETE FROM estoque WHERE idproduto = $1",
        [idproduto]
      );
      console.log("Estoque deletado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
