const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );


module.exports = {
    getMatches: function(req, res, next) {
        const q = 'select * from person limit 10;';
        db.any(q, [])
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                console.log(err);
                return next(err);
            });
    }
}