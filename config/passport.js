var passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	mongoose = require("mongoose"),
	userAccounts = mongoose.model("userAccounts");

// Local Login Strategy
passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		function (req, username, password, done) {
			const filter = { $or: [{ email: username }, { phone: username }, { username: username }] };

			userAccounts.findOne(filter, function (err, user) {
				if (err) {
					return done({ message: "Error with db" });
				}
				if (!user) {
					return done(null, false, {
						message: "User Not Found. Please signup to use this application",
					});
				}
				user.comparePassword(password, function (err, isMatch) {
					if (err) {
						return done(err);
					}
					if (!isMatch) {
						return done(null, false, { message: "Invalid Password" });
					}
					return done(null, user);
				});
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, { _id: user._id, userType: user.userType });
});

passport.deserializeUser(function (user, done) {
	userAccounts.findById(user._id, function (err, user) {
		if (user) {
			done(err, user);
		} else {
			return done({ msgCode: 11 });
		}
	});
});

// passport middlewares
passport.isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return next({ msgCode: 3 });
};

passport.isAuthorized = function (userType) {
	return function (req, res, next) {
		if (req.user.userType == userType) {
			return next();
		}
		return next({ message: "User is Not authorized to access this api." });
	};
};

module.exports = passport;
