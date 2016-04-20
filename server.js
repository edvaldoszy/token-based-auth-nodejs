var app = require('express')();
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

//var jwt = require('jsonwebtoken');
var config = require('./app/config');

const PORT = parseInt(process.env.PORT) || 80;
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

load('routes', { cwd: 'app' })
    .into(app);

app.get('/', function(request, response) {
    response.send('The API is at http://localhost/api');
});

app.listen(PORT);
console.log('Server is running at http://localhost:' + PORT);