// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');										// From app2.js
//var mongoose = require('mongoose');							// From app2.js
//var Schema = mongoose.Schema;								// From app2.js

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static('public'));

// connect to mongo
//mongoose.connect('localhost', 'testing_storeImg');         // From app2.js

var port = process.env.PORT || 8080;        // set our port

//app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

/**
router.route('/file').post( function(req, res) {
	var fileName = req.body.fileName;
	var lefil = req.body;
	res.json({ message: 'hooray! We got the file! ' + fileName+ ' '+ lefil});
});
*/
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.post('/upload', function(req, res){
	console.log('We are sending a post');

	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '/uploads');
	console.log(form);

	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});

	// log any errors that occur
	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
		res.end('success');
		console.log('form.on')
	});

	// parse the incoming request containing the form data
	form.parse(req);

});




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

var server = app.listen(port, function(){
	console.log('Server listening on port 8080');
});
