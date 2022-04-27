const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {

    getIngredients(req, res) {

        const get_query = `select a.ingredient_id, a.name, b.quantity-c.quantity as quantity_remaining from ingredient as a, ingredients_purchased as b, ingredients_used as c where a.ingredient_id = b.ingredient_id and a.ingredient_id = c.ingredient_id;
        `;
        
        db.query(get_query, []).then(result => {
            res.send(result.rows);
        });
    }

    


};