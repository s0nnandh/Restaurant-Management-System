const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {
    getOfflineOrders: function(req, res, next) {
        query = `select * from order_ where (status!='Delivered'or status!='Completed') and order_mode='In-person'`
        db.any(query, []).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    getOnlineOrders: function(req, res, next) {
        query = `select * from order_ where (status!='Delivered'or status!='Completed') and order_mode='Online'`
        db.any(query, []).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    getOrderItems: function(req, res, next) {
        const query = `select item_name, item_quantity from order_items natural join item where
        order_id = $1;`;
        db.any(query, [req.params['order_id']]).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

}