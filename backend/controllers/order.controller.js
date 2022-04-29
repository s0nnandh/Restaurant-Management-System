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

    placeOrder: function(req, res, next) {
        const query_1 = `insert into order_($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id`;
        values_1 = [req.body.total_cost, req.body.payment_method, req.body.order_mode, "Ordered",
            req.body.table_id, req.body.placing_time, req.body.customer_id, req.body.delivery_area,
            NULL, NULL, req.body.order_date, NULL]
        db.one(query_1, [values_1]).then(result => {
            lst = req.body.order_items;
            lst.forEach(element => {
                element["order_id"] = result.order_id;
            });
            db.tx(t => {
                const queries = lst.map(l => {
                    return t.none('INSERT INTO order_items(item_id, order_id, item_quantity) VALUES(${item_id}, ${order_id}, ${item_quantity})', l);
                });
                return t.batch(queries);
            })
                .then(data => {
                    // SUCCESS
                    // data = array of null-s
                    res.sendStatus(200);
                })
                .catch(error => {
                    res.sendStatus(500);
                    console.log(err);
                    return next(err);
                    // ERROR
                });
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    }

}