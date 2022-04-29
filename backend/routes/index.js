var path = require('path');
const multer = require('multer');
const upload = multer();
const authService = require( path.resolve( __dirname, "../controllers/auth.controller.js" ) );
const employeeService = require( path.resolve( __dirname, "../controllers/employee.controller.js" ) );
const itemService = require( path.resolve( __dirname, "../controllers/item.controller.js" ) );
const ingredientService = require( path.resolve( __dirname, "../controllers/ingredient.controller.js" ) );
const orderService = require( path.resolve( __dirname, "../controllers/order.controller.js" ) );
const tableService = require( path.resolve( __dirname, "../controllers/table.controller.js" ) );
const chefService = require( path.resolve( __dirname, "../controllers/chef.controller.js" ) );
const deliveryService = require( path.resolve( __dirname, "../controllers/delivery_person.controller.js" ) );
const analyticsService = require( path.resolve( __dirname, "../controllers/analytics.controller.js" ) );
const managerService = require( path.resolve( __dirname, "../controllers/manager.controller.js" ) );

module.exports = app => {

    app.post('/api/auth/login', upload.none(), authService.login);
    app.post('/api/auth/register', upload.none(), authService.addCustomer);

    app.post('/api/employee/add_chef', upload.none(), employeeService.addChef);
    app.post('/api/employee/add_waiter', upload.none(), employeeService.addWaiter);
    app.post('/api/employee/add_delivery_person', upload.none(), employeeService.addDeliveryPerson);
    app.get('/api/employee/chef_info', employeeService.getChefs);
    app.get('/api/employee/waiter_info', employeeService.getWaiters);
    app.get('/api/employee/delivery_person_info', employeeService.getDeliveryPersons);

    app.post('/api/ingredient/add_ingredient', upload.none(), ingredientService.addIngredient);
    app.get('/api/ingredient/ingredient_info', ingredientService.getIngredients);

    app.post('/api/item/add_item', upload.none(), itemService.addItem);
    app.get('/api/item/item_info', itemService.getItems);

    app.get('/api/order/get_offline_orders', orderService.getOfflineOrders);
    app.get('/api/order/get_online_orders', orderService.getOnlineOrders);
    app.get('/api/order/get_order_items/:order_id', orderService.getOrderItems);
    app.post('/api/order/place_order', upload.none(), orderService.placeOrder);

    app.get('/api/table/free_tables', tableService.getFreetables);
    app.get('/api/table/booked_tables', tableService.getBookedtables);
    app.get('/api/table/:table_id', tableService.getTabledetails);

    app.get('/api/chef/get_chef_items/:chef_id', chefService.getChefOrders);
    app.post('/api/chef/change_chef_order', chefService.changeChefOrderStatus);

    app.get('/api/delivery_person/get_dp_items/:delivery_person_id', deliveryService.getDeliveryPersonOrders);
    app.post('/api/delivery_person/change_dp_order', deliveryService.changeDeliveryPersonOrderStatus);

    app.get('/api/analytics/top_dishes_by_dow', analyticsService.topItemsByDayOfWeek);
    app.get('/api/analytics/rush_hours', analyticsService.rushHours);

    app.post('/api/manager/assign_chef', upload.none(), managerService.assignOrderToChef);
    app.post('/api/manager/assign_delivery_person', upload.none(), managerService.assignOrderToChef);

};