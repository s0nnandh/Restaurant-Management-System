var path = require('path');
const multer = require('multer');
const upload = multer();
const authService = require( path.resolve( __dirname, "../controllers/auth.controller.js" ) );


module.exports = app => {
    app.get('/api/auth', authService.getMatches);

};