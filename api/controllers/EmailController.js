/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



    index: function(req, res, next) {
        if (req.param('id')) {
            Email.findOne(req.param('id'), function foundEmail(err, email) {
                if (err) return next(err);
                if (!email) return next();
                return res.json({email: email});
            });
        } else {
            Email.find(function foundEmails(err, emails) {
                if (err) return next(err);
                // pass the array down to the /views/index.ejs page
                return res.json({emails: emails});
            });
        }
        Email.find({}).exec(function(e,listOfEmails){
            Email.watch(req);
            Email.subscribe(req.socket,listOfEmails,['create','update']);
        });
    },

    getEmailsNewerThanTimestamp: function(req, res, next) {
        var timestamp = req.param('id');
        if (timestamp) {
            Email.find({createdAt: { '>': timestamp }}, function foundEmails(err, emails) {
                if (err) return next(err);
                return res.json({emails: emails});
            });
        }
    },

    create: function(req, res, next) {
        var emailObj = {
            _id: req.param('_id'),
            responsible_user_id: req.param('responsible_user_id') || req.token.sid,
            status: req.param('status') || 2,
            assigned_by: req.token.sid
        }


        Email.create(emailObj, function emailCreated(err, email) {

            if (err) {
                return res.json({err: err});
            }

            Email.publishCreate(email);
            var socket = req.socket;
            var io = sails.io;
            io.sockets.emit('email', {_id: email._id, responsible_user_id: email.responsible_user_id, status: email.status, assigned_by: email.assigned_by, createdAt: email.createdAt, updatedAt: email.updatedAtd});
            console.log('A new email with messageId '+email._id+' has been created');

            email.save(function(err, email) {
                if (err) return next(err);
                return res.json({email: email});
            });
        });
    },

    update: function(req, res, next) {

        Email.findOne(req.param('id'), function foundEmail(err, currentEmail) {
            if (err) return next(err);
            if (!currentEmail) return next();
            var emailObj = {
                _id: req.param('_id'),
                responsible_user_id: req.param('responsible_user_id') || currentEmail.responsible_user_id,
                status: req.param('status') || currentEmail.status,
                assigned_by: req.param('responsible_user_id') ? req.token.sid : currentEmail.assigned_by
            }

            Email.update(req.param('id'), emailObj, function emailUpdated(err, email) {
                if (err) {
                    return res.json({err: err});
                }
                Email.publishUpdate(email[0]._id, {responsible_user_id: email[0].responsible_user_id, status: email[0].status, assigned_by: email[0].assigned_by, createdAt: email[0].createdAt, updatedAt: email[0].updatedAtd} );
//                sails.sockets.blast('email', {responsible_user_id: email[0].responsible_user_id, status: email[0].status, assigned_by: email[0].assigned_by});
                var socket = req.socket;
                var io = sails.io;
                io.sockets.emit('email', {_id: email[0]._id, responsible_user_id: email[0].responsible_user_id, status: email[0].status, assigned_by: email[0].assigned_by});
                console.log('Email with messageId '+req.param('id')+' has been updated');
                return res.json({email: email});
            });

        });

    },

    destroy: function(req, res, next) {

        Email.findOne(req.param('id'), function foundEmail(err, email) {
            if (err) return next(err);

            if (!email) return next('Email doesn\'t exist.');

            Email.destroy(req.param('id'), function emailDestroyed(err) {
                if (err) return next(err);
            });

            //res.redirect('/email');

        });
    },
	
};