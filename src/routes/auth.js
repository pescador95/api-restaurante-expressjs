module.exports = function (bd, app, jwt, verifyJWT) {
  app.post("/login", async (req, res, next) => {
    let login = req.body.login;
    let senha = req.body.senha;
    try {
      const { rows } = await bd.conn.query(
        "SELECT * FROM usuario WHERE login = $1 AND senha = $2",
        [login, senha]
      );
      if (rows) {
        const id = rows[0].id;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 600,
        });
        return res.json({ auth: true, token: token });
      }
    } catch (err) {
      res.status(500).json({ message: "Credenciais incorretas." });
    }
  });
};
