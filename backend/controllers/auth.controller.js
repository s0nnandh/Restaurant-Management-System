const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getMatches(req, res) {

        const get_query = `select * from person limit 10;`;
        // const count_query = `select count(*) as match_count from match;`;
        // const values = [skip, limit];

        db.query(get_query, []).then(result => {
            res.send({
                persons: result.rows,
            });
        });
    }
};