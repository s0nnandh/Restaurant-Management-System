const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getChefs(req, res) {

        const get_query = `select c.name, c.phone_number, a.shift_start_time, a.shift_end_time, b.chef_rank, b.cuisine from employee as a, chef as b, person as c where a.id = b.id and a.id=c.id;`;
        
        db.query(get_query, []).then(result => {
            res.send(result.rows);
        });
    },

    getWaiters(req, res) {

        const get_query = `select c.name, c.phone_number,a.shift_start_time, a.shift_end_time from employee as a, person as c where a.employee_type = 'Waiter' and a.id=c.id;`;
        
        db.query(get_query, []).then(result => {
            res.send(result.rows);
        });
    },

    getDeliveryPersons(req, res) {

        const get_query = `select c.name, c.phone_number,a.shift_start_time, a.shift_end_time, b.primary_area, b.average_rating from employee as a, delivery_person as b, person as c where a.id = b.id and a.id=c.id;`;
        
        db.query(get_query, []).then(result => {
            res.send(result.rows);
        });
    }


};