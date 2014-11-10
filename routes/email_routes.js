var express    = require('express'); 		// call express
var router = express.Router(); 				// get an instance of the express Router
// on routes that end in /emails
// ----------------------------------------------------
router.route('/emails')

// create an email (accessed at POST http://localhost:3000/api/emails)
    .post(function(req, res) {

        var email = new Email(); 		// create a new instance of the email model
        email.name = req.body.name;  // set the emails name (comes from the request)

        // save the email and check for errors
        email.save(function(err) {
            if (err)
                res.send(err);
            message = 'Email ' + email.name + ' created!';
            console.log(message);
            io.emit('chat message', message);
            res.json({ message: message });
        });

    })

// get all the emails (accessed at GET http://localhost:3000/api/emails)
    .get(function(req, res) {
        Email.find(function(err, emails) {
            if (err)
                res.send(err);

            res.json(emails);
        });
    });

// on routes that end in /emails/:email_id
// ----------------------------------------------------
router.route('/emails/:email_id')

// get the email with that id (accessed at GET http://localhost:8080/api/emails/:email_id)
    .get(function(req, res) {
        Email.findById(req.params.email_id, function(err, email) {
            if (err)
                res.send(err);
            res.json(email);
        });
    })

// update the email with this id (accessed at PUT http://localhost:3000/api/emails/:email_id)
    .put(function(req, res) {

        // use our email model to find the email we want
        Email.findById(req.params.email_id, function(err, email) {

            if (err)
                res.send(err);

            email.name = req.body.name; 	// update the emails info

            // save the email
            email.save(function(err) {
                if (err)
                    res.send(err);
                message = 'Email ' + email.name + ' updated!';
                console.log(message);
                io.emit('chat message', message);
                res.json({ message: 'Email updated!' });
            });

        });
    })

// delete the email with this id (accessed at DELETE http://localhost:8080/api/emails/:email_id)
    .delete(function(req, res) {
        Email.remove({
            _id: req.params.email_id
        }, function(err, email) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });