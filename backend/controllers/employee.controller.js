const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    addChef: function(req, res, next){

        const insert_query_1 = `insert into person (id, name, phone_number) values ($1, $2, $3) returning id;`;
        const insert_query_2 = `insert into employee (id, shift_start_time, shift_end_time, employee_type, salary) values ($1, $2, $3, $4, $5) returning id;`;
        const insert_query_3 = `insert into chef (id, cuisine, chef_rank, availability) values ($1, $2, $3, $4) returning id;`;

        values_1 = [req.body.id, req.body.name, req.body.phone_number];
        values_2 = [req.body.id, req.body.start_time, req.body.end_time, "Chef", req.body.salary ]
        values_3 = [req.body.id, req.body.cuisine, req.body.chef_rank, false]

        db.tx(t => {
            // creating a sequence of transaction queries:
            const q1 = t.one(insert_query_1, values_1);
            const q2 = t.one(insert_query_2, values_2);
            const q3 = t.one(insert_query_3, values_3);
        
            // returning a promise that determines a successful transaction:
            return t.batch([q1, q2, q3]); // all of the queries are to be resolved;
        })
            .then(data => {
                // success, COMMIT was executed
                res.send(data);
            })
            .catch(error => {
                // failure, ROLLBACK was executed
                console.log(error);
                return next(error);
            });
    },

    getChefs: function(req, res, next) {

        const get_query = `select c.name, c.phone_number, a.shift_start_time, a.shift_end_time, b.chef_rank, b.cuisine from employee as a, chef as b, person as c where a.id = b.id and a.id=c.id;`;
        
        db.any(get_query, []).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    },

    getWaiters: function(req, res, next) {

        const get_query = `select c.name, c.phone_number,a.shift_start_time, a.shift_end_time from employee as a, person as c where a.employee_type = 'Waiter' and a.id=c.id;`;
        
        db.any(get_query, []).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    },

    getDeliveryPersons: function(req, res, next) {

        const get_query = `select c.name, c.phone_number,a.shift_start_time, a.shift_end_time, b.primary_area, b.average_rating from employee as a, delivery_person as b, person as c where a.id = b.id and a.id=c.id;`;
        
        db.any(get_query, []).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    }
};