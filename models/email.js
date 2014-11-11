// app/models/email.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmailSchema   = new Schema({
    message_id: String,
    responsible_user_id: {type: Number},
    status: {type: Number, default: 0},
    assigned_by: {type: Number},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date}
});

module.exports = mongoose.model('Email', EmailSchema);