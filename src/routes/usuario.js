module.exports = function (bd, app, verifyJWT) {
  app.get("/usuario/", verifyJWT, async (req, res, next) => {
    try {
      const { rows } = await bd.conn.query("SELECT * FROM usuario");
      return res.status(200).send(rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.post("/usuario/", verifyJWT, async (req, res, next) => {
    const { login, senha, idfuncionario } = req.body;
    const { id } = req.params;

    try {
      const usuario = await bd.conn.query(
        "INSERT INTO usuario (login, senha, idfuncionario) VALUES ($1, $2, $3) RETURNING *",
        [login, senha, idfuncionario]
      );
      console.log("usuario cadastrado com sucesso!");
      return res.status(200).send(usuario.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.put("/usuario/", verifyJWT, async (req, res, next) => {
    const { login, senha, idfuncionario, id } = req.body;

    try {
      const usuario = await bd.conn.query(
        "UPDATE usuario SET login = $1, senha = $2, idfuncionario = $3 WHERE id = $4 RETURNING *",
        [login, senha, idfuncionario, id]
      );
      console.log("usuario atualizado com sucesso!");
      return res.status(200).send(usuario.rows);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  app.delete("/usuario/", verifyJWT, async (req, res, next) => {
    const { id } = req.body;
    try {
      await id.forEach((element) => {
        const usuario = bd.conn.query("DELETE FROM usuario WHERE id = $1", [
          element,
        ]);
        console.log("usuario deletado com sucesso!");
        return res.status(200).send(usuario.rows);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });
};
