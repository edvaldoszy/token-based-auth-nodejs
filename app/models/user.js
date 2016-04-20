var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('user', schema);