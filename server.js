// Initialize packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Champion = require('./app/models/champion');
var Battlerite = require('./app/models/battlerite');

// Connect to database
mongoose.connect('mongodb://admin:root@ds047146.mlab.com:47146/battleright');

// Configure app to use bodyParser()
// This allows us to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;

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

router.route('/champions/:champ_id/battlerites')

	.get(function(req, res) {
		Battlerite.find({
			champ_id: req.params.champ_id
		}, function(err, battlerites) {
			if (err) { res.send(err); }

			res.json(battlerites);
		});
	});

router.route('/champions/:champ_id/battlerites/:br_id')

	.get(function(req, res) {
		Battlerite.find({
			champ_id: req.params.champ_id,
			_id: req.params.br_id
		}, function(err, battlerite) {
			if (err) { res.send(err); }

			res.json(battlerite);
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
		battlerite.champ_id = req.body.champ_id;
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
			if (req.body.champ) battlerite.champ_id = req.body.champ_id;
			if (req.body.portraitURL) battlerite.portrait_url = req.body.portrait_url;
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

// Start server
app.listen(port);
console.log('Listening on port: ' + port);