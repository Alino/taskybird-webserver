// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    inactive: {type: Boolean, default: false},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);