const { query } = require("express");
const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {
    assignOrderToChef: function(req, res, next){
        query = `update order_ set chef_id = $1 where order_id = $2;`
        db.any(query, [req.body.order_id, req.body.chef_id]).then(result => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    },

    assignOrderToDel: function(req, res, next){
        query = `update order_ set delivery_person_id = $1 where order_id = $2;`
        db.any(query, [req.body.order_id, req.body.chef_id]).then(result => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    },

    markCompleted: function(req, res, next){
        const query = `update order_ set status = 'Completed' where order_id = $1;`
        db.any(query, [req.body.order_id]).then(result => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    }

}