// Initialize packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Champion = require('./app/models/champion');

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

// Routes that end in /champions
router.route('/champions')

	.post(function(req, res) {
		var champ = new Champion();
		champ.name = req.body.name;
		champ.job = req.body.job;
		champ.portraitURL = req.body.portraitURL;
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
		Champion.findById(req.params.champ_id, function(err, champion) {
			if (err) { res.send(err); }

			res.json(champion);
		})
	})

	.put(function(req, res) {
		Champion.findById(req.params.champ_id, function(err, champion) {
			if (err) { res.send(err); }
			champion.name = req.body.name;

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

// Register our routes
app.use('/api', router);

// Start server
app.listen(port);
console.log('Listening on port: ' + port);