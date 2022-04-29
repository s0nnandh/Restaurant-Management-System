const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    addChef: function(req, res, next){

        const insert_query_1 = `insert into person (name, phone_number, password) values ($1, $2, $3) returning id;`;
        const insert_query_2 = `insert into employee (id, shift_start_time, shift_end_time, employee_type, salary) values ($1, $2, $3, $4, $5) returning id;`;
        const insert_query_3 = `insert into chef (id, cuisine, chef_rank, availability) values ($1, $2, $3, $4) returning id;`;

        values_1 = [req.body.name, req.body.phone_number, "ChefInit"];
        

        db.tx(t => {
            const q1 = t.one(insert_query_1, values_1);
            return q1;
        })
            .then(q1 => {
                db.tx(t => {
                    console.log(q1);

                    values_2 = [q1.id, req.body.start_time, req.body.end_time, "Chef", req.body.salary ]
                    values_3 = [q1.id, req.body.cuisine, req.body.chef_rank, false]
                    const q2 = t.one(insert_query_2, values_2);
                    const q3 = t.one(insert_query_3, values_3);
                    return t.batch([q1, q2, q3]);
                })
                    .then( data => {
                        res.send(data[0]);
                    })
                    .catch(error => {
                        db.any(`delete from person where id = $1`, [q1.id]);
                        console.log(error);
                        return next(error);
                    })                
            })
            .catch(error => {
                console.log(error);
                return next(error);
            });
    },

    addWaiter: function(req, res, next){

        const insert_query_1 = `insert into person (name, phone_number, password) values ($1, $2, $3) returning id;`;
        const insert_query_2 = `insert into employee (id, shift_start_time, shift_end_time, employee_type, salary) values ($1, $2, $3, $4, $5) returning id;`;

        values_1 = [req.body.name, req.body.phone_number, "WaiterInit"];
        

        db.tx(t => {
            const q1 = t.one(insert_query_1, values_1);
            return q1;
        })
            .then(q1 => {
                db.tx(t => {
                    console.log(q1);

                    values_2 = [q1.id, req.body.start_time, req.body.end_time, "Waiter", req.body.salary ]
                    const q2 = t.one(insert_query_2, values_2);
                    return t.batch([q1, q2]);
                })
                    .then( data => {
                        res.send(data[0]);
                    })
                    .catch(error => {
                        db.any(`delete from person where id = $1`, [q1.id]);
                        console.log(error);
                        return next(error);
                    })                
            })
            .catch(error => {
                console.log(error);
                return next(error);
            });
    },

    addDeliveryPerson: function(req, res, next){

        const insert_query_1 = `insert into person (name, phone_number, password) values ($1, $2, $3) returning id;`;
        const insert_query_2 = `insert into employee (id, shift_start_time, shift_end_time, employee_type, salary) values ($1, $2, $3, $4, $5) returning id;`;
        const insert_query_3 = `insert into delivery_person (id, average_rating, primary_area, availability) values ($1, $2, $3, $4) returning id;`;

        values_1 = [req.body.name, req.body.phone_number, "DelPerInit"];
        

        db.tx(t => {
            const q1 = t.one(insert_query_1, values_1);
            return q1;
        })
            .then(q1 => {
                db.tx(t => {
                    console.log(q1);

                    values_2 = [q1.id, req.body.start_time, req.body.end_time, "Delivery-Person", req.body.salary ]
                    values_3 = [q1.id, 5.00, req.body.primary_area, false]
                    const q2 = t.one(insert_query_2, values_2);
                    const q3 = t.one(insert_query_3, values_3);
                    return t.batch([q1, q2, q3]);
                })
                    .then( data => {
                        res.send(data[0]);
                    })
                    .catch(error => {
                        db.any(`delete from person where id = $1`, [q1.id]);
                        console.log(error);
                        return next(error);
                    })                
            })
            .catch(error => {
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