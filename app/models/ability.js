// app/models/ability.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbilitySchema = new Schema({
	name: String,
	champion: String,
	portrait_url: String,
	desc: String,
	type: String,
	cooldown: Number,
	key_binding: String
});

module.exports = mongoose.model('Ability', AbilitySchema);