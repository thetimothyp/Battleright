var express = require('express');

// Initialize model variables
var Champion = require('./models/champion');
var Battlerite = require('./models/battlerite');
var Ability = require('./models/ability');

module.exports = function(app) {
	// Set up API routes
	var router = express.Router();

	// Middleware for all requests
	router.use(function(req, res, next) {
		console.log('Something...');
		next();
	})

	router.get('/', function(req, res) {
		res.json({ message: 'welcome to our api :)' });
	});

	// ==========================
	// ROUTES FOR CHAMPIONS
	// ==========================

	// Routes for all champions
	router.route('/champions')

		.post(function(req, res) {
			var champ = new Champion();
			champ.name = req.body.name;
			champ.job = req.body.job;
			champ.portrait_url = req.body.portrait_url;
			champ.bio = req.body.bio;
		
			champ.save(function(err) {
				if (err) { res.send(err); }
		
				res.json({ message: 'Champion created' });
			});
		})

		.get(function(req, res) {
			Champion.find(function(err, champions) {
				if (err) { res.send(err); }

				res.json(champions);
			});
		});


	// Routes for a single champion
	router.route('/champions/:champ_id')

		.get(function(req, res) {
			Champion.find({
				name: req.params.champ_id
			}, function(err, champion) {
				if (err) { res.send(err); }

				res.json(champion);
			})
		})

		.put(function(req, res) {
			Champion.findById(req.params.champ_id, function(err, champion) {
				if (err) { res.send(err); }
				if (req.body.name) champion.name = req.body.name;
				if (req.body.job) champion.job = req.body.job;
				if (req.body.portrait_url) champion.portrait_url = req.body.portrait_url;
				if (req.body.bio) champion.bio = req.body.bio;

				champion.save(function(err) {
					if (err) { res.send(err); }

					res.json({ message: 'Champion updated!' });
				});
			});
		})

		.delete(function(req, res) {
			Champion.remove({
				_id: req.params.champ_id
			}, function(err, champion) {
				if (err) { res.send(err); }

				res.json({ message: 'Successfully deleted.' });
			});
		});

	// ==========================
	// ROUTES FOR CHAMPION-SPECIFIC BATTLERITES
	// ==========================

	router.route('/champions/:champ/battlerites')

		.get(function(req, res) {
			Battlerite.find({
				champion: req.params.champ
			}, function(err, battlerites) {
				if (err) { res.send(err); }

				res.json(battlerites);
			});
		});

	router.route('/champions/:champ/battlerites/:br_id')

		.get(function(req, res) {
			Battlerite.find({
				champion: req.params.champ,
				_id: req.params.br_id
			}, function(err, battlerite) {
				if (err) { res.send(err); }

				res.json(battlerite);
			});
		});

	// ==========================
	// ROUTES FOR CHAMPION-SPECIFIC ABILITIES
	// ==========================

	router.route('/champions/:champ/abilities')

		.get(function(req, res) {
			Ability.find({
				champion: req.params.champ
			}, function(err, abilities) {
				if (err) { res.send(err); }

				res.json(abilities);
			});
		});

	// ==========================
	// ROUTES FOR ABILITIES
	// ==========================

	// Routes for all abilities
	router.route('/abilities')

		.post(function(req, res) {
			var ability = new Ability();
			ability.name = req.body.name;
			ability.champion = req.body.champion;
			ability.portrait_url = req.body.portrait_url;
			ability.desc = req.body.desc;
			ability.type = req.body.type;
			ability.affects = req.body.affects;
			ability.cooldown = req.body.cooldown;
			ability.cast_time = req.body.cast_time;
			ability.energy_cost = req.body.energy_cost;
			ability.energy_gain = req.body.energy_gain;
			ability.key_binding = req.body.key_binding;

			ability.save(function(err) {
				if (err) { res.send(err); }

				res.json({ message: 'Battlerite created!' });
			});
		})

		.get(function(req, res) {
			Ability.find(function(err, abilities) {
				if (err) { res.send(err); }

				res.json(abilities);
			})
		});

	// routes for single ability
	router.route('/abilities/:ab_id')

		.get(function(req, res) {
			Ability.find({ name : req.params.ab_id }, function(err, ability) {
				if (err) { res.send(err); }

				res.json(ability);
			});
		})

		.put(function(req, res) {
			Ability.findById(req.params.ab_id, function(err, ability) {
				if (err) { res.send(err); }
				if (req.body.name) ability.name = req.body.name;
				if (req.body.champion) ability.champion = req.body.champion;
				if (req.body.portrait_url) ability.portrait_url = req.body.portrait_url;
				if (req.body.desc) ability.desc = req.body.desc;
				if (req.body.type) ability.type = req.body.type;
				if (req.body.type) ability.cooldown = req.body.cooldown;
				if (req.body.type) ability.key_binding = req.body.key_binding;

				ability.save(function(err) {
					if (err) { res.send(err); }

					res.json({ message: 'Ability updated!' });
				});
			});
		})

		.delete(function(req, res) {
			Ability.remove({
				_id: req.params.ab_id
			}, function(err, ability) {
				if (err) { res.send(err); }

				res.json({ message: 'Successfully deleted.' });
			});
		});



	// ==========================
	// ROUTES FOR BATTLERITES
	// ==========================

	// Routes for all battlerites
	router.route('/battlerites')

		.post(function(req, res) {
			var battlerite = new Battlerite();
			battlerite.name = req.body.name;
			battlerite.champion = req.body.champion;
			battlerite.portrait_url = req.body.portrait_url;
			battlerite.desc = req.body.desc;
			battlerite.tier = req.body.tier;
			battlerite.type = req.body.type;

			battlerite.save(function(err) {
				if (err) { res.send(err); }

				res.json({ message: 'Battlerite created!' });
			});
		})

		.get(function(req, res) {
			Battlerite.find(function(err, battlerites) {
				if (err) { res.send(err); }

				res.json(battlerites);
			})
		});

	// Routes for a single Battlerite
	router.route('/battlerites/:br_id')

		.get(function(req, res) {
			Battlerite.findById(req.params.br_id, function(err, battlerite) {
				if (err) { res.send(err); }

				res.json(battlerite);
			});
		})

		.put(function(req, res) {
			Battlerite.findById(req.params.br_id, function(err, battlerite) {
				if (err) { res.send(err); }
				if (req.body.name) battlerite.name = req.body.name;
				if (req.body.champion) battlerite.champion = req.body.champion;
				if (req.body.portrait_url) battlerite.portrait_url = req.body.portrait_url;
				if (req.body.desc) battlerite.desc = req.body.desc;
				if (req.body.tier) battlerite.tier = req.body.tier;
				if (req.body.type) battlerite.type = req.body.type;

				battlerite.save(function(err) {
					if (err) { res.send(err); }

					res.json({ message: 'Battlerite updated!' });
				});
			});
		})

		.delete(function(req, res) {
			Battlerite.remove({
				_id: req.params.br_id
			}, function(err, battlerite) {
				if (err) { res.send(err); }

				res.json({ message: 'Successfully deleted.' });
			});
		});

	// Register our routes
	app.use('/api', router);
}