var path = require('path');
var XBBCODE = require('./services/parser/xbbcode');

var Guide = require('./models/guide');
var Champion = require('./models/champion');
var Battlerite = require('./models/battlerite');
var Ability = require('./models/ability');

module.exports = function(app, passport) {

	// =======================
	// HOME PAGE (with login links)
	// =======================
	app.get('/', isUser, function(req, res) {
		Guide.find(function(err, guides) {
			if (err) res.send(err);
			Champion.find(function(err, champions) {
				res.render('index.ejs', {
					user : req.user,
					guides : guides,
					champions : champions
				});
			})
		}).limit(10);
	});

	// =======================
	// LOGIN
	// =======================
	// show login form
	app.get('/login', isUser, function(req, res) {
		res.render('login.ejs', { 
			message: req.flash('loginMessage') ,
			user : req.user
		});
	})

	// process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));

	// =======================
	// SIGNUP
	// =======================
	app.get('/signup', isUser, function(req, res) {
		res.render('signup.ejs', { 
			message: req.flash('signupMessage') ,
			user : req.user
		});
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
		Champion.find(function(err, champions) {
			Battlerite.find(function(err, battlerites) {
				Ability.find(function(err, abilities) {
					res.render('create.ejs', {
						user : req.user,
						champions : champions,
						battlerites : battlerites,
						abilities : abilities
					});
				})
			})
		})
	});

	app.get('/guides', isUser, function(req, res) {
		Champion.find(function(err, champions) {
			if (err) { res.send(err); }
			res.render('guides.ejs', {
				user : req.user,
				champions : champions
			});
		})
	});

	app.get('/guides/:champion', isUser, function(req, res) {
		Guide.find({
			champion : req.params.champion
		}, function(err, guides) {
			res.render('champion_guides.ejs', {
				user : req.user,
				guides : guides
			})
		})
	})

	app.post('/guides', isLoggedIn, processEdits, function(req, res) {
		var guide = new Guide();
		guide.title = req.body.title;
		guide.champion = req.body.champion;
		guide.tier1comments = req.body.tier1comments;
		guide.tier2comments = req.body.tier2comments;
		guide.tier3comments = req.body.tier3comments;
		guide.tier4comments = req.body.tier4comments;
		guide.tier5comments = req.body.tier5comments;
		guide.lmb_comments = req.body.lmb_comments;
		guide.rmb_comments = req.body.rmb_comments;
		guide.space_comments = req.body.space_comments;
		guide.q_comments = req.body.q_comments;
		guide.e_comments = req.body.e_comments;
		guide.r_comments = req.body.r_comments;
		guide.f_comments = req.body.f_comments;

		for (var i = 0; i < req.body.ch_title.length; i++) {
			var ch = {
				title: req.body.ch_title[i],
				body: req.body.ch_body[i]
			}
			guide.chapters.push(ch);
		}
		guide.user = req.user._id; // enable when isLoggedIn is active
		guide.author = req.user.local.username;

		guide.save(function(err) {
			if(err) { res.send(err); }
			res.redirect('/guides/' + guide.champion + '/' + guide._id);
		})
	});

	app.get('/guides/:champion/:guide_id', isUser, function(req, res) {
		
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);
			Guide.find({
				champion : guide.champion,
			}, function(err, guides) {
				res.render('view_guide.ejs', {
					user : req.user._id,
					guide : guide,
					XBBCODE : XBBCODE,
					guides : guides
				});
			}).limit(10);
		});
	})

	app.get('/guides/:champion/:guide_id/edit', isLoggedIn, isUser, function(req, res) {
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);
			res.render('edit.ejs', {
				guide : guide,
				user : req.user
			});
		});
	})

	app.post('/guides/:champion/:guide_id/edit', isLoggedIn, processEdits, function(req, res) {
		Guide.findById(req.params.guide_id, function(err, guide) {
			if(err) res.send(err);

			guide.title = req.body.title;
			guide.tier1comments = req.body.tier1comments;
			guide.tier2comments = req.body.tier2comments;
			guide.tier3comments = req.body.tier3comments;
			guide.tier4comments = req.body.tier4comments;
			guide.tier5comments = req.body.tier5comments;
			guide.lmb_comments = req.body.lmb_comments;
			guide.rmb_comments = req.body.rmb_comments;
			guide.space_comments = req.body.space_comments;
			guide.q_comments = req.body.q_comments;
			guide.e_comments = req.body.e_comments;
			guide.r_comments = req.body.r_comments;
			guide.f_comments = req.body.f_comments;
			for (var i = 0; i < req.body.ch_title.length; i++) {
				console.log(req.body);
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
				res.redirect('/guides/' + guide.champion + '/' + guide._id);
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

function isUser(req, res, next) {
	if (!req.isAuthenticated()) {
		req.user = 0;
		req.user._id = 0;
	}
	return next();
}

function processEdits(req, res, next) {
	if( Object.prototype.toString.call(req.body.ch_title) != '[object Array]' ) {
		req.body.ch_body = [].concat(req.body.ch_body);
		req.body.ch_title = [].concat(req.body.ch_title);
	}

	return next();
}