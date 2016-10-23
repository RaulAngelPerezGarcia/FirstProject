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
var mongoose = require('mongoose'); 
//app.use(bodyParser.json());
var router = require('./router/imagefile');


app.use(express.static(path.join(__dirname + '/public')));

var port = process.env.PORT || 8080;



mongoose.connect('mongodb://localhost/test');

var Image = require('./models/image.js');

//console.log(Image);

var testImage = new Image({
	name: 'FirstImage',
	url: 'https://pbs.twimg.com/profile_images/269279233/llama270977_smiling_llama_400x400.jpg'
});


testImage.save(function(err) {
	if (err) throw err;
	console.log('User saved succsescfully yo')
});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('we are connected man');
  // we're connected!
});

var router = express.Router();         

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
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

});

// =============================================================================
//URL : http://localhost:8080/images/
// To get all the images/files stored in MongoDB
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
