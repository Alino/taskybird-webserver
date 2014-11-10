// app/models/email.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmailSchema   = new Schema({
    message_id: String,
    responsible_user_id: String,
    status: Number,
    assigned_by: String,
    date: { created: Date, updated: Date }
});

module.exports = mongoose.model('Email', EmailSchema);