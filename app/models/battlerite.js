// app/models/battlerite.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BattleriteSchema = new Schema({
	name: String,
	champ_id: String,
	portrait_url: String,
	desc: String,
	tier: Number,
	type: String
});

module.exports = mongoose.model('Battlerite', BattleriteSchema);