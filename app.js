// server
// =============================================================================

// call the packages we need
var express 	= require('express');
var path 		= require('path');
var app 		= express();
var formidable	= require('formidable');
var fs 			= require('fs');
var mongoose 	= require('mongoose'); 
var router 		= require('./router/imagefile');
var Image 		= require('./models/image.js');
var port 		= process.env.PORT || 8080;
var db 			= mongoose.connection;
var router 		= express.Router(); 



app.use(express.static(path.join(__dirname + '/public')));

mongoose.connect('mongodb://localhost/test');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('We are connected to mongoose');
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

// REGISTER OUR router 
app.use('/', router);

app.post('/upload', function(req, res){
	console.log('We are sending a post');

	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;
	console.log(form);

	// =============================================================================
	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	/**
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
	*/
	// =============================================================================

	var testImage = new Image({
		name: 'FirstImage',
		url: 'https://pbs.twimg.com/profile_images/269279233/llama270977_smiling_llama_400x400.jpg'
	});

	testImage.save(function(err) {
		if (err) throw err;
		console.log('Image saved succsescfully')
	});

});

// To get all the images/files stored in MongoDB
// =============================================================================
app.get('/images', function(req, res) {
	Image.find({}, function(err, users){
		if (err) throw err;

		console.log(users);
		res.send(users);
	})

});

// START THE SERVER
// =============================================================================

var server = app.listen(port, function(){
	console.log('Server listening on port 8080');
});
