const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {
    getCompletedOrders: function(req, res, next) {
        query = `select * from order_ where status='Completed' or status='Delivered'  and customer_id = $1;`;
        db.any(query, [req.params.customer_id]).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    getIncompleteOrders: function(req, res, next) {
        query = `select * from order_ where status='Prepared' or status='Ordered'  and customer_id = $1;`;
        db.any(query, [req.params.customer_id]).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    }
}