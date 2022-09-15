const mysql = require("../mysql/mysql").pool;

class ProdutoController {
  async index(req, res) {
    try {
      mysql.getConnection((error, conn) => {
        conn.query(`SELECT * FROM produto`, (error, result, fields) => {
          if (error) {
            return res.status(500).send({ error: error });
          }
          return res.status(201).json(result);
        });
        conn.release();
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    const { descricao, unidade, valorUni, qtdEst } = req.body;
    try {
      mysql.getConnection((error, conn) => {
        (error, result, fields) => {
          conn.query(
            `INSERT INTO produto (Pro_Descricao, Pro_Unidade, Pro_VlrUni, Pro_QtdEst) ` +
              `VALUES ("${descricao}", "${unidade}", ${valorUni}, ${qtdEst})`,
            (error, result, fields) => {
              if (error) {
                return res.status(500).send({ error: error });
              }
              return res.status(201).json(result);
            }
          );
        };
        conn.release();
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    const { descricao, unidade, valorUni, qtdEst } = req.body;
    const { id } = req.params;

    try {
      mysql.getConnection((error, conn) => {
        conn.query(
          `SELECT * FROM produto WHERE Pro_Codigo = ${id}`,
          (error, result, fields) => {
            if (error) {
              return res.status(500).send({ error: error });
            }

            if (JSON.stringify(result) === "[]") {
              return res.status(404).json("Produto não existe");
            } else {
              conn.query(
                `UPDATE produto SET Pro_Descricao = "${descricao}", Pro_Unidade = "${unidade}", ` +
                  `Fun_Contato = ${
                    contato != "" ? `"${contato}"` : "NULL"
                  } WHERE Fun_Codigo = ${id}`,
                (error, result, fields) => {
                  if (error) {
                    return res.status(500).send({ error: error });
                  }
                  return res.status(201).json(result);
                }
              );
            }
          }
        );
        conn.release();
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      mysql.getConnection((error, conn) => {
        conn.query(
          `SELECT * FROM funcionario WHERE Fun_Codigo = ${id}`,
          (error, result, fields) => {
            if (error) {
              return res.status(500).send({ error: error });
            }

            if (JSON.stringify(result) === "[]") {
              return res.status(404).json("Funcionario não existe");
            } else {
              return res.status(201).json(result);
            }
          }
        );
        conn.release();
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new ProdutoController();
