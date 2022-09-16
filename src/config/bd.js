var config = require("dotenv").config();
const pgp = require("pg-promise");

config = {
  driver: process.env.DRIVER,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
};

const cn = {
  host: `localhost`,
  port: 5432,
  database: "api_restaurante",
  user: "postgres",
  password: "postgres",
  max: 30,
};

const cnJSON = JSON.stringify(cn);

const db = pgp(config);

// cn
// config

// use up to 30 connections
//  `postgres://username:password@host:port/database`
// `postgres://postgres:postgres@localhost:5432/api_restaurante`
// `${config.driver}://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`

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
