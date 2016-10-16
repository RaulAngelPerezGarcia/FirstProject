// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var fs = require('fs');										// From app2.js
var mongoose = require('mongoose');							// From app2.js
var Schema = mongoose.Schema;								// From app2.js

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// connect to mongo
//mongoose.connect('localhost', 'testing_storeImg');         // From app2.js

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.sendFile(__dirname + '/views//index.html');
});

router.route('/file').post( function(req, res) {
	var fileName = req.body.fileName;
	var lefil = req.body;
	res.json({ message: 'hooray! We got the file! ' + fileName+ ' '+ lefil});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// Error handlers
// =============================================================================
// Catch 404 adn forwar to error handler
app.use(function(req, res, next){
	var err = new Error('No encontrado');
	err.status = 404;
	next(err);
});
// Development error handler
// will print stacktrace
if (app.get('env') === 'development'){
	app.use(function(req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler
// no stacltraces leaked to user
app.use(function(req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started at port: ' + port);
