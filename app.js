// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017'); // connect to our database
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router
var users = require('./routes/user_routes');
var emails = require('./routes/email_routes');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.render('default', {title: 'socket.io chat'});
});

// ----------------------------------------------------


// REGISTER OUR ROUTES --------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', users);
app.use('/api', emails);



// START THE SERVER
// =============================================================================
http.listen(3000, function(){
    console.log('Magic is happening on *:3000');
});

io.on('connection', function(socket){
    console.log('new client');

    socket.on('my other event', function(data){
        console.log("client " + data.client + " succesfully recieved message " + data.msg);
        //console.log(data);
        //io.emit('chat message', msg);
    });

    socket.on('chat message', function (data) {
       console.log(data);
       io.emit('chat message', data);
    });

});