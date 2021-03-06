/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var bcrypt = require('bcrypt');
module.exports = {

    schema: true,

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        title: {
            type: 'string'
        },

        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string'
        },

        online: {
            type: 'string'
        },

        admin: {
            type: 'boolean',
            defaultsTo: false
        },

        team_id: {
            type: 'integer',
        },

        user:{
            model: "user"
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.confirmation;
            delete obj.encryptedPassword;
            return obj;
        }

    },

/*
    beforeValidate: function (values, next) {
        console.log(values);
        if (typeof values.admin !== 'undefined') {
            if (values.admin === 'unchecked') {
                values.admin = false;
            } else  if (values.admin[1] === 'on') {
                values.admin = true;
            }
            console.log(values);
        }
        next();
    },
*/

    beforeCreate: function (values, next) {

        // This checks to make sure the password and password confirmation match before creating record
        if (!values.password || values.password != values.confirmation) {
            return next({err: ["Password doesn't match password confirmation."]});
        }

        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
            if (err) return next(err);
            values.encryptedPassword = encryptedPassword;
            // values.online= true;
            next();
        });
    },

    validPassword: function(password, user, cb) {
        bcrypt.compare(password, user.encryptedPassword, function(err, match) {
            if (err) cb(err);

            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        });
    }

};