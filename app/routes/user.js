var router = require('express').Router();
var UserModel = require('../models/user');

var jwt = require('jsonwebtoken');
var config = require('../config');

router.get('/', function(request, response) {

    console.dir(request.decoded);
    
    UserModel.find({
        
    }, {
        __v: false

    }, function(err, user) {
        if (err) {
            response.status(500).json({
                status: 'ERROR',
                message: err
            });
        } else if (user) {
            response.status(200).json(user);
        } else {
            response.status(400).json({
                status: 'ERROR',
                message: 'Deu erro, cara =/'
            });
        }
    });
});

router.post('/', function(request, response) {

    new UserModel({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        admin: false

    }).save(function(err) {
        if (err) {
            response.status(400).json({
                status: 'ERROR',
                message: err
            });
            console.error(err);
        } else {
            response.sendStatus(204);
            console.info('New user created');
        }
    });
});

module.exports = function(app) {
    app.use('/api/users', router);
};