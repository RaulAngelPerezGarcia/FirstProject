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

var aws = require('aws-sdk');


var AWS_ACCESS_KEY 	= ''
var AWS_SECRET_KEY 	= ''
var S3_BUCKET 		= 'yourolderself'



app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/node_modules')));

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
	/**
	// create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = false;
	console.log(form);
	*/
	var testImage = new Image({
		name: 'FirstImage',
		url: 'https://pbs.twimg.com/profile_images/269279233/llama270977_smiling_llama_400x400.jpg'
	});

	testImage.save(function(err) {
		if (err) throw err;
		console.log('Image saved succsescfully')
	});

});


router.get('/sign', function(req, res) {
	aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

	var s3 = new aws.S3()
	var options = {
	  Bucket: S3_BUCKET,
	  Key: req.query.file_name,
	  Expires: 60,
	  ContentType: req.query.file_type,
	  ACL: 'public-read'
	}

	s3.getSignedUrl('putObject', options, function(err, data){
		console.log(err);
		if(err) return res.send('Error with S3')


		res.json({
			signed_request: data,
			url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
		  })
	})
})


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
