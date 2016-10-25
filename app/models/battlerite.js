// app/models/battlerite.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BattleriteSchema = new Schema({
	name: String,
	champion: String,
	portrait_url: String,
	desc: String,
	tier: String,
	type: String
});

module.exports = mongoose.model('Battlerite', BattleriteSchema);