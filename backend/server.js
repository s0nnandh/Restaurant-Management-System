require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const app = express()
app.use(bodyParser.json())
app.use(cors(corsOptions))

// app.all('/*', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header("Access-Control-Allow-Headers", `Origin, X-Requested-With, Content-Type, 
//     Accept, x-client-key, x-client-token, x-client-secret, Authorization`);    next();
// });

routes(app);

app.listen(process.env.BACKEND_PORT, () => {
    console.log('Server started!')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {app}
