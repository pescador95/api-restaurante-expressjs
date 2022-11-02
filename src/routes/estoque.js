module.exports = function (bd, app, verifyJWT) {
  app.get("/estoque/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM estoque");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/estoque/", verifyJWT, async (req, res, next) => {
    const { idproduto, quantidadeitem, custounidade } = req.body;
    const { id } = req.params;

    try {
      const estoque = await bd.conn.query(
        "INSERT INTO estoque (idproduto, quantidadeitem, custounidade) VALUES ($1, $2, $3) RETURNING *",
        [idproduto, quantidadeitem, custounidade]
      );
      console.log("Estoque cadastrado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/estoque/", verifyJWT, async (req, res, next) => {
    const { idproduto, quantidadeitem, custounidade, id } = req.body;

    try {
      const estoque = await bd.conn.query(
        "UPDATE estoque SET idproduto = $1, quantidadeitem = $2, custounidade = $3, WHERE id = $4 RETURNING *",
        [idproduto, quantidadeitem, custounidade, id]
      );
      console.log("Estoque atualizado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/estoque/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const estoque = bd.conn.query("DELETE FROM estoque WHERE id = $1", [
          element,
        ]);
        console.log("Estoque deletado com sucesso!");
        return res.status(200).send(estoque.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
