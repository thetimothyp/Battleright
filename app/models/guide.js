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
	}]
});

module.exports = mongoose.model('Guide', GuideSchema);