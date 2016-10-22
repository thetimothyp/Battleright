var path = require('path');
var XBBCODE = require('./services/parser/xbbcode');

var Guide = require('./models/guide');

module.exports = function(app, passport) {

	// =======================
	// HOME PAGE (with login links)
	// =======================
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// =======================
	// LOGIN
	// =======================
	// show login form
	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	})

	// process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

	// =======================
	// SIGNUP
	// =======================
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	// =======================
	// PROFILE
	// =======================
	// must be logged in to visit this page
	// we will use route middleware for this (isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user from session and pass to template
		});
	});

	app.get('/profile/guides', isLoggedIn, function(req, res) {
		Guide.find({
			user: req.user._id
		}, function(err, guides) {
			console.log(guides);
			if (err) { res.send(err); }
			res.render('my_guides.ejs', {
				guides : guides
			});
		});
	});

	// =======================
	// USER'S GUIDES
	// =======================
	// must be logged in to create a guide
	app.get('/create', isLoggedIn, function(req, res) {
		res.render('create.ejs', {
			user : req.user
		});
	});

	app.get('/guides', isGuideCreator, function(req, res) {
		Guide.find(function(err, guides) {
			if (err) { res.send(err); }
			res.render('guides.ejs', {
				user : req.user,
				guides : guides
			});
		})
	});

	app.post('/guides', isLoggedIn, processEdits, function(req, res) {
		var guide = new Guide();
		guide.title = req.body.title;
		guide.champion = req.body.champion;
		for (var i = 0; i < req.body.ch_title.length; i++) {
			var ch = {
				title: req.body.ch_title[i],
				body: req.body.ch_body[i]
			}
			guide.chapters.push(ch);
		}
		guide.user = req.user._id; // enable when isLoggedIn is active

		guide.save(function(err) {
			if(err) { res.send(err); }
			res.redirect('/guides/' + guide._id);
		})
	});

	app.get('/guides/:guide_id', isGuideCreator, function(req, res) {
		
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);
			res.render('view_guide.ejs', {
				user : req.user._id,
				guide : guide,
				XBBCODE : XBBCODE
			});
		});
	})

	app.get('/guides/:guide_id/edit', isLoggedIn, function(req, res) {
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);
			res.render('edit.ejs', {
				guide : guide
			});
		});
	})

	app.post('/guides/:guide_id/edit', isLoggedIn, function(req, res) {
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);

			guide.title = req.body.title;
			guide.champion = req.body.champion;
			for (var i = 0; i < req.body.ch_title.length; i++) {
				var ch = {
					title: req.body.ch_title[i],
					body: req.body.ch_body[i]
				}
				if (i < guide.chapters.length) {
					guide.chapters[i] = ch;
				} else {
					guide.chapters.push(ch);
				}
			}

			guide.save(function(err) {
				if(err) { res.send(err); }
				res.redirect('/guides/' + guide._id);
			});
		})

	})

	// =======================
	// LOGOUT
	// =======================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	// if user is authenticated in session, continue
	if (req.isAuthenticated())
		return next();

	// if not, redirect to index
	res.redirect('/');
}

function isGuideCreator(req, res, next) {
	if (!req.isAuthenticated())
		req.user = 0;

	return next();
}

function processEdits(req, res, next) {
	if( Object.prototype.toString.call(req.body.content) != '[object Array]' ) {
		req.body.ch_body = [].concat(req.body.ch_body);
		req.body.ch_title = [].concat(req.body.ch_title);
	}

	return next();
}