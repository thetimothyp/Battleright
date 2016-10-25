// app/models/guide.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuideSchema = new Schema({
	title: String,
	champion: String,
	user: String,
	author: String,
	chapters: [{
		title: String,
		body: String
	}],
	tier1comments : String,
	tier2comments : String,
	tier3comments : String,
	tier4comments : String,
	tier5comments : String
});

module.exports = mongoose.model('Guide', GuideSchema);