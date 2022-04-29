const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getChefOrders: function(req, res, next) {

        const get_query = `select order_id, status, placing_time from order_ where status='Ordered' and chef_id=$1;`;
        
        db.any(get_query, [req.params['chef_id']]).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    },
    
    changeChefOrderStatus: function(req, res, next) {

        const queryObject = url.parse(req.url, true).query;
        const skip = queryObject.chef_id;
        const limit = queryObject.order_id;

        const get_query = `update order_ set status = 'Prepared' where chef_id = $1 and order_id = $2;`;
        
        db.any(get_query, [req.body.chef_id,req.body.order_id]).then(result => {
            res.send({status:'Updated'});
        })
        .catch((err) => {
            res.send({status:'Not Updated'});
            console.log(err);
            return next(err);
        });
    }

}

