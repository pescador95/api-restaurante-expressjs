const pg = require("pg");
var conn = "postgres://user:password@host/database";
require("dotenv").config();

var config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,

  database: process.env.DATABASE,
  port: process.env.PORT,
};

pg.connect(conn, function (err, client, done) {
  if (err) {
    return console.error("error fetching client from pool", err);
  }
  client.query("SELECT $1::int AS number", ["1"], function (err, result) {
    done();
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].number);
  });
});
module.exports = conn;
