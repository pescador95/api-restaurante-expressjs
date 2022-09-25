module.exports = function (bd, app, verifyJWT) {
  app.get("/fornecedor/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM fornecedor");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/fornecedor/create", verifyJWT, async (req, res, next) => {
    const { nomefornecedor, cnpj } = req.body;
    const { id } = req.params;

    try {
      const fornecedor = await bd.conn.query(
        "INSERT INTO fornecedor (nomefornecedor, cnpj ) VALUES ($1, $2) RETURNING *",
        [nomefornecedor, cnpj]
      );
      console.log("Fornecedor cadastrado com sucesso!");
      return res.status(200).send(fornecedor.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/fornecedor/update", verifyJWT, async (req, res, next) => {
    const { nomefornecedor, cnpj, id } = req.body;

    try {
      const fornecedor = await bd.conn.query(
        "UPDATE fornecedor SET nomefornecedor = $1, cnpj = $2, WHERE id = $3 RETURNING *",
        [nomefornecedor, cnpj, id]
      );
      console.log("Fornecedor atualizado com sucesso!");
      return res.status(200).send(fornecedor.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/fornecedor/delete", verifyJWT, async (req, res, next) => {
    const { nomefornecedor } = req.body;
    const { id } = req.params;
    try {
      const fornecedor = await bd.conn.query(
        "DELETE FROM fornecedor WHERE nomefornecedor = $1",
        [nomefornecedor]
      );
      console.log("Fornecedor deletado com sucesso!");
      return res.status(200).send(fornecedor.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
