const Pool = require('pg').Pool

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_USER_PASS,
    database: process.env.POSTGRES_DB
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}