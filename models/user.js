// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserSchema   = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    inactive: {type: Boolean, default: false},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);