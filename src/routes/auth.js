module.exports = function (bd, app, jwt) {
  app.post("/auth", async (req, res) => {
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
        return res.json({ auth: true, token: token, login: login });
      }
    } catch (err) {
      res.status(500).json({ message: "Credenciais incorretas." });
    }
  });
};
