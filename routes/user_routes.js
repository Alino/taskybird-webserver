var User    = require('../models/user');
var express = require('express'); 		// call express
var router  = express.Router(); 		// get an instance of the express Router
// on routes that end in /users
// ----------------------------------------------------
router.route('/users')


// create a user (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {

        var user = new User(); 		// create a new instance of the user model
        user.name = req.body.name;  // set the users name (comes from the request)

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            message = 'User ' + user.name + ' created!';
            console.log(message);
            //io.emit('chat message', message);
            res.json({ message: message });
        });

    })

// get all the users (accessed at GET http://localhost:3000/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

// update the user with this id (accessed at PUT http://localhost:3000/api/users/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name; 	// update the users info

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);
                message = 'User ' + user.name + ' updated!';
                console.log(message);
                //io.emit('chat message', message);
                res.json({ message: 'User updated!' });
            });

        });
    })

// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;