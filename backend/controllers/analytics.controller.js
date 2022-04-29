const path = require("path");
const url = require("url");
const db = require( path.resolve( __dirname, "./index.js" ) );

module.exports = {
    topItemsByDayOfWeek: function(req, res, next) {
        query = `with 
        item_day as (select item_id, item_name, item_quantity,  extract(dow from order_date)
                     as day from order_ natural join order_items natural join item ), 
        item_day_2 as (select item_id, item_name, day, sum(item_quantity) as total_quantity 
                       from item_day group by item_id, item_name, day),
        item_day_3 as (select item_id, item_name, day, rank() over(partition by day order
                        by total_quantity desc, item_id asc) as dish_rank from item_day_2)
        select item_id, item_name, day, dish_rank from item_day_3 where dish_rank <= 3
        order by day, dish_rank;`;
        db.any(query, []).then(result => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    }

};