var mongoose = require('mongoose'); 


var imageSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	url:{
		type: String,
		required: true
	}
});


var Image = mongoose.model('Image', imageSchema);

module.exports = Image;