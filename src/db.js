const pgp = require("pg-promise")({
    // Initialization Options
});

const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB}`;

const db = pgp(cn);

module.exports = db;