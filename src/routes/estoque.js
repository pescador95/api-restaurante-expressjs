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
    const { idproduto, quantidade, custounidade } = {
      quantidade: req.body.quantidade,
      custounidade: req.body.custounidade,
      idproduto: req.body.idproduto,
    };

    try {
      const { rows } = await bd.conn.query(
        "SELECT * FROM estoque WHERE idproduto = $1",
        [idproduto]
      );
      if (rows.length <= 0) {
        const estoque = await bd.conn.query(
          "INSERT INTO estoque (idproduto, quantidade, custounidade) VALUES ($1, $2, $3) RETURNING *",
          [idproduto, quantidade, custounidade]
        );
        console.log("Estoque cadastrado com sucesso!");
        return res.status(200).send(estoque.rows);
      } else {
        return res.status(400).send("Produto já cadastrado no estoque!");
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.get("/estoque/count", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT COUNT(id) FROM estoque");
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.get("/estoque/count", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT COUNT(id) FROM estoque");
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/estoque/", verifyJWT, async (req, res, next) => {
    const { quantidade, custounidade, id } = {
      quantidade: req.body.quantidade,
      custounidade: req.body.custounidade,
      id: req.body.id,
    };
    console.log(quantidade, custounidade, id);

    try {
      const estoque = await bd.conn.query(
        "UPDATE estoque SET quantidade = $1, custounidade = $2 WHERE id = $3 RETURNING *",
        [quantidade, custounidade, id]
      );
      console.log();
      console.log("Estoque atualizado com sucesso!");
      return res.status(200).send(estoque.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/estoque/", verifyJWT, async (req, res, next) => {
    const { id } = { id: req.body };
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
