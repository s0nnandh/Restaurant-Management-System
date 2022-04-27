const pgp = require('pg-promise')({})

const connection = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_USER_PASS,
    database: process.env.POSTGRES_DB
};

const db = pgp(connection);

module.exports = db;