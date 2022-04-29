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
        const query_1 = `insert into order_(total_cost, payment_method, order_mode, status,
            table_id, placing_time, customer_id, delivery_area, delivery_person_id, chef_id,
            delivery_rating, order_date, order_rating) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning order_id`;
        table_id = req.body.table_id == -1 ? null: req.body.table_id;
        customer_id = req.body.customer_id == ""? null: req.body.customer_id;
        delivery_area = null;

        if(req.body.table_id != -1){table_id = req.body.table_id}
        if(req.body.customer_id != ""){
            db.any(`select * from customer where id = $1;`, [customer_id]).then(customer_data => {
                delivery_area = customer_data[0].default_address;
            })
            .catch(err => {
            console.log(err);
            return next(err);
        });


        }
        values_1 = [req.body.total_cost, req.body.payment_method, req.body.order_mode, "Ordered",
            table_id, req.body.placing_time, customer_id, delivery_area,
            null, null, null, req.body.order_date, null]
       
        db.one(query_1, values_1).then(result => {
            lst = req.body.order_items;
            lst.forEach(element => {
                element["order_id"] = result.order_id;
            });
            db.tx(t => {
                const queries = lst.map(l => {
                    return t.none(`INSERT INTO order_items(item_id, order_id, item_quantity) 
                    VALUES(${l.item_id}, ${l.order_id}, ${l.quantity})`, l);
                });
                return t.batch(queries);
            })
                .then(data => {
                    // SUCCESS
                    // data = array of "NULL"-s
                    res.send(result);
                })
                .catch(err => {
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