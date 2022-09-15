require("dotenv").config();
const pg = require("pg-promise");

var config = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,

  database: process.env.DATABASE,
  port: process.env.PORT,
};

const db = pg(
  `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
);

db.one(conn, function (err, client, done) {
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
module.exports = db;
