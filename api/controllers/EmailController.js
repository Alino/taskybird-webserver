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
    },

    create: function(req, res, next) {
        var emailObj = {
            _id: req.param('_id'),
            responsible_user_id: req.param('responsible_user_id'),
            status: req.param('status'),
            assigned_by: req.token.uid
        }


        Email.create(emailObj, function emailCreated(err, email) {

            if (err) {
                return res.json({err: err});
            }

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
                assigned_by: req.param('assigned_by') || currentEmail.assigned_by
            }

            Email.update(req.param('id'), emailObj, function emailUpdated(err, email) {
                if (err) {
                    return res.json({err: err});
                }

                return res.json({email: email});
            });

        });

    }
	
};