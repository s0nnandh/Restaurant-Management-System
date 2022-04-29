var path = require('path');
const multer = require('multer');
const upload = multer();
const authService = require( path.resolve( __dirname, "../controllers/auth.controller.js" ) );
const employeeService = require( path.resolve( __dirname, "../controllers/employee.controller.js" ) );
const itemService = require( path.resolve( __dirname, "../controllers/item.controller.js" ) );
const ingredientService = require( path.resolve( __dirname, "../controllers/ingredient.controller.js" ) );
const tableService = require( path.resolve( __dirname, "../controllers/table.controller.js" ) );

module.exports = app => {
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
};