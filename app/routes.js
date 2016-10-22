var path = require('path');

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

	// =======================
	// EDIT / PREVIEW
	// =======================
	// app.get('/edit', function(req, res) {
	// 	res.render('edit.ejs');
	// });

	// app.post('/preview', function(req, res) {
	// 	res.render('preview.ejs', {
	// 		guide : req.body.guide
	// 	});
	// });

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