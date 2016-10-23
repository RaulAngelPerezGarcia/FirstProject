// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express 	= require('express');
var path 		= require('path');
var app 		= express();
var formidable	= require('formidable');
var fs 			= require('fs');

//For mongoose
var mongooose = require('mongoose');
//app.use(bodyParser.json());
var router = require('./router/imagefile');


// not needed
//app.use('/js', express.static(__dirname, + '/js'));
//app.use('/css', express.static(__dirname, + '/css'));
app.use(express.static(path.join(__dirname + '/public')));


var port = process.env.PORT || 8080;        // set our port


// =============================================================================
// =============================================================================

// connect to mongo http://mongoosejs.com/docs/connections.html


mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('we are connected man');
  // we're connected!
});

var kittySchema = mongoose.Schema({
    name: String
});






// =============================================================================
// =============================================================================

// router FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

// more router for our API will happen here

// REGISTER OUR router -------------------------------
// all of our router will be prefixed with /api
app.use('/', router);

app.post('/upload', function(req, res){
	console.log('We are sending a post');

	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '/uploads');

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
		console.log('The File has been successfully uploaded')
	});

	// parse the incoming request containing the form data
	form.parse(req);

});

// =============================================================================
//URL : http://localhost:8080/images/
// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
	//calling the function from index.js class using router object..
	router.getImages(function(err, genres) {
		if (err) {
			console.log('User, there has been an error: \n' + err)
			throw err;
		}
		res.json(genres);
	});
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
// no stacktraces leaked to user
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
