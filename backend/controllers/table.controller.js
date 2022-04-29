const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );


module.exports = {

    getFreetables(req, res){

        get_query = `select table_id, capacity, position, availability from table_ where availability=TRUE;`;

        db.any(get_query, []).then(result =>{
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    getBookedtables(req, res){

        get_query = `select table_id, capacity, position, availability from table_ where availability=FALSE;`;

        db.any(get_query, []).then(result =>{
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    getTabledetails: function(req, res, next) {
        const query = `select table_id, capacity, position, availability from table_ where
        table_id = $1;`;
        db.any(query, [req.params['table_id']]).then(result => {
            res.send(result[0]);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    }
    
    

};