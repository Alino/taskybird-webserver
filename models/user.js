// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    inactive: Boolean,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);