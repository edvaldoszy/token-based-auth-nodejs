var router = require('express').Router();
var UserModel = require('../models/user');

var jwt = require('jsonwebtoken');
var config = require('../config');

router.use(function(request, response, next) {

    if (request.path == '/auth') {
        next();
        return;
    }

    var token = request.query.token || request.headers['token'];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return response.status(403).json({
                    status: 'ERROR',
                    message: 'Invalid access token'
                });
            } else {
                request.decoded = decoded;
                next();
            }
        });
    } else {
        return response.status(403).json({
            status: 'ERROR',
            message: 'No token provided'
        });
    }
});

router.get('/', function(request, response) {

    response.json([
        'POST /auth',
        'POST /users',
        'GET /users'
    ]);
});

router.post('/auth', function(request, response) {

    UserModel.findOne({
        email: request.body.email,
        password: request.body.password

    }, function(err, user) {
        if (err) {
            response.status(400).json({
                status: 'ERROR',
                message: err.message
            });
        } else if (!user) {
            response.status(403).json({
                status: 'ERROR',
                message: 'Invalid email or password'
            });
        } else {
            var token = jwt.sign({
                name: user.name,
                email: user.email,
                password: user.password,
                admin: user.admin

            }, config.secret);

            response.status(200).json({
                status: 'OK',
                token: token
            });
        }
    });
});

module.exports  = function(app) {
    app.use('/api', router);
};