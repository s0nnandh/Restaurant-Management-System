const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getItems: function(req, res, next){

        const get_query = `with item_max_quantity(item_id, max_quantity) as 
        (select item_id, max(quantity) as max_quantity from required_ group by item_id),
        main_ingredient(item_id, ingredient_id) as 
        (select a. item_id, a.ingredient_id from required_ as a, item_max_quantity as b 
        where a.item_id = b.item_id and a.quantity=b.max_quantity) 
        select a.item_name, c.name, a.category, a.is_veg, a.cost, a.availability from item as a,
        main_ingredient as b , ingredient as c where a.item_id = b.item_id and b.ingredient_id=c.ingredient_id 
        order by a.item_name, c.name;`;
        
        db.any(get_query, []).then(result => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            return next(err);
        });
    }

    


};