// app/models/champion.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChampionSchema = new Schema({
	name: String,
	job: String,
	portrait_url: String,
	bio: String,
});

module.exports = mongoose.model('Champion', ChampionSchema);