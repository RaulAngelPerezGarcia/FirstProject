var mongoose = require('mongoose'); 


var imageSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	}	
	password:{
		type: String,
		required: true,
		unique: true
	}
});


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;