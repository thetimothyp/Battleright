// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
	// =====================
	// passport session setup
	// =====================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// user to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// =====================
	// LOCAL SIGNUP
	// =====================

	passport.use('local-signup', new LocalStrategy({
		// local strategy uses username instead of email by default, so 
		// override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // pass the request to the callback
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.email' : email }, function(err, user) {
				if (err) { return done(err); }

				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var newUser = new User();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err) {
						if(err) { throw err; }
						return done(null, newUser);
					});
				}
			});
		});
	}));

	// =====================
	// LOCAL LOGIN
	// =====================

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		User.findOne({ 'local.email' : email }, function(err, user) {
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}

			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Invalid password.'));
			}

			return done(null, user);
		});
	}));
};