/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {



    index: function(req, res, next) {
        if (req.param('id')) {
            User.findOne(req.param('id'), function foundUser(err, user) {
                if (err) return next(err);
                if (!user) return next();
                return res.json({user: user});
            });
        } else {
            User.find(function foundUsers(err, users) {
                if (err) return next(err);
                // pass the array down to the /views/index.ejs page
                return res.json({users: users});
            });
        }
    },


    create: function(req, res, next) {
        var userObj = {
            name: req.param('name'),
            title: req.param('param'),
            email: req.param('email'),
            password: req.param('password'),
            confirmation: req.param('confirmation')
        }


        User.create(userObj, function userCreated(err, user) {

            if (err) {
                return res.json({err: err});
            }

            user.save(function(err, user) {
                if (err) return next(err);

                return res.json({user: user});
            });
        });
    },


    update: function(req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, currentUser) {
            if (err) return next(err);
            if (!currentUser) return next();

            var userObj = {
                name: req.param('name'),
                title: req.param('title'),
                email: req.param('email')
            }

            User.update(req.param('id'), userObj, function userUpdated(err, user) {
                if (err) {
                    return res.json({err: err});
                }

                return res.json({user: user});
            });

        });

    },

    destroy: function(req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });

            //res.redirect('/user');

        });
    },

};