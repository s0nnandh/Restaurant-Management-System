const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getDeliveryPersonOrders: function(req, res, next) {

        const get_query = `select a.order_id, a.placing_time, b.locality, b.city, b.pincode from order_ as a, area as b where a.status='Prepared' and a.delivery_person_id=$1 and a.delivery_area=b.area_id;`;
        
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