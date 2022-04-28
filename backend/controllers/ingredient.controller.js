const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getIngredients: function(req, res, next){

        const get_query = `with ingre(ingredient_id,name,q_r) as
        (select a.ingredient_id, a.name, b.quantity-c.quantity as 
                quantity_remaining from ingredient as a, 
                ingredients_purchased as b, 
                ingredients_used as c 
                where a.ingredient_id = b.ingredient_id and a.ingredient_id = c.ingredient_id)
        select ingredient_id,name, coalesce(sum(q_r),0) as quantity_remaining from ingredient natural left outer join ingre group by ingredient_id,name order by quantity_remaining desc;
        `;
        
        db.any(get_query, []).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    },

    addIngredient: function(req, res, next){
        const insert_query = `insert into ingredient(name) values ($1) returning ingredient_id;`;
        db.one(insert_query, [req.body.name]).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        })
    },
    


};