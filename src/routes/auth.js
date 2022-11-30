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
          expiresIn: 10000,
        });
        return res.json({ auth: true, token: token, login: login });
      }
    } catch (err) {
      res.status(500).json({ message: "Incorrect Credentials." });
    }
  });

  app.post("/refresh", async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).json({ auth: false, message: "No valid token." });
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticated the token." });
      const id = decoded.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 10000,
      });
      return res.json({ auth: true, token: token });
    });
  });
};
