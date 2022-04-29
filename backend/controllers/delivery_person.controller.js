const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getDeliveryPersonOrders: function(req, res, next) {

        const get_query = `select order_id, status, placing_time from order_ where status='Prepared' and delivery_person_id=$1;`;
        
        db.any(get_query, [req.params['delivery_person_id']]).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    },
    
    changeDeliveryPersonOrderStatus: function(req, res, next) {

        const queryObject = url.parse(req.url, true).query;
        const skip = queryObject.chef_id;
        const limit = queryObject.order_id;

        const get_query = `update order_ set status = 'Delivered' where delivery_person_id = $1 and order_id = $2;`;
        
        db.any(get_query, [req.body.delivery_person_id,req.body.order_id]).then(result => {
            res.send({status:'Updated'});
        })
        .catch((err) => {
            res.send({status:'Not Updated'});
            console.log(err);
            return next(err);
        });
    }

}