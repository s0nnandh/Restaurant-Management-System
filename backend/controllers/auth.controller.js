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
        
    }
}