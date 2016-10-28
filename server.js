// Initialize packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');
var port = process.env.PORT || 9000;

// Connect to database
mongoose.connect('mongodb://admin:root@ds047146.mlab.com:47146/battleright');
require('./config/passport')(passport); // pass passport for configuration

// ===========================
// Configure app
// ===========================

app.use(morgan('dev')); // log every req to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to get data from POST
app.use(bodyParser.json());
app.use(session({ 
		secret: 'C30C7A73-5E4D-4291-9630-35FF28FB819B' ,
		cookie : {
			_expires : 6000000
		}
	})
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set static routes (styles, scripts, etc)
app.use(express.static(__dirname + '/public'));

// ===========================
// CONFIGURE ROUTES
// ===========================

require('./app/apiroutes.js')(app);
require('./app/routes.js')(app, passport);

// Start server
app.listen(port);
console.log('Listening on port: ' + port);