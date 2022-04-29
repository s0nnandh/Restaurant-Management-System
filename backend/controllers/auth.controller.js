const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );


module.exports = {

    login: function(req, res, next) {
        const query_1 = `select id from person where phone_number = $1 and password = $2;` ;
        const query_2 = `select employee_type from employee where id = $1;`;
        db.any(query_1, [req.body.phone_number, req.body.password]).then((result1) => {
            if(result1.length != 0){
                db.any(query_2, [result1[0].id]).then(result2 => {
                    if(result2.length != 0){
                        res.send({
                            login: "true",
                            role: result2[0].employee_type
                        })
                    }else{
                        res.send({
                            login: "true",
                            role: "customer"
                        })
                    }
                }).catch(err => {
                console.log(err);
                return next(err);
        });
            }else{
                res.send({
                    login: "false",
                    role: ""
                })
            }
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
    },

    addCustomer: function(req, res, next){

    area_id=0;
    id=0;
    const insert_query_1 = `insert into person (name, phone_number, password) values ($1, $2, $3) returning id;`;
    const insert_query_2 = `insert into customer (id, age, discount, default_address) values ($1, $2, $3, $4) returning id;`;
    const get_query = `select * from area where locality=$1 and city=$2 and pincode=$3`;
    const insert_query_3 = `insert into area (locality, city, pincode) values ($1, $2, $3) returning area_id;`;

    values_1 = [req.body.name, req.body.phone_number, req.body.password];
    
    db.any(get_query, [req.body.locality, req.body.city, req.body.pincode]).then(result => {
                        if(result.length != 0){
                            // ingredient_ids.push({
                            //     ingredient_id : result.ingredient_id,
                            //     quantity: element.quantity
                            // });
                            area_id = result[0].area_id;

                        }else{
                            db.one(insert_query_3, [req.body.locality, req.body.city, req.body.pincode]).then(result2 => {
                                area_id = result2.area_id;
                            })
                            .catch((err) => {
                                console.log(err);
                                return next(err);
                            })
                        } 

                        db.one(insert_query_1, values_1).then(result3 => {
                            id = result3.id;
                            db.one(insert_query_2, [id, req.body.age, 0, req.body.default_address]).then(result4 => {
                                
                                res.send({
                                    register: "true",
                                });
                                
                            })
                            .catch((err) => {
                                db.any(`delete from person where id = $1`, [id]);
                                console.log(err);
                                return next(err);
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            return next(err);
                        })


                    })
                    .catch((err) => {
                        console.log(err);
                        return next(err);
                    });
    
    }
}