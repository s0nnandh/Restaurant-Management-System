var path = require('path');
const multer = require('multer');
const upload = multer();
const authService = require( path.resolve( __dirname, "../controllers/auth.controller.js" ) );
const employeeService = require( path.resolve( __dirname, "../controllers/employee.controller.js" ) );
const itemService = require( path.resolve( __dirname, "../controllers/item.controller.js" ) );
const ingredientService = require( path.resolve( __dirname, "../controllers/ingredient.controller.js" ) );

module.exports = app => {
    app.get('/api/auth', authService.getMatches);
    app.post('/api/employee/add_chef', upload.none(), employeeService.addChef);
    app.post('/api/employee/add_waiter', upload.none(), employeeService.addWaiter);
    app.post('/api/employee/add_delivery_person', upload.none(), employeeService.addDeliveryPerson);
    app.get('/api/employee/chef_info', employeeService.getChefs);
    app.get('/api/employee/waiter_info', employeeService.getWaiters);
    app.get('/api/employee/delivery_person_info', employeeService.getDeliveryPersons);
    app.get('/api/ingredient/ingredient_info', ingredientService.getIngredients);
    app.get('/api/item/item_info', itemService.getItems);
};