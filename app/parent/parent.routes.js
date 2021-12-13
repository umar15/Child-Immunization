const parentController = require("./parent.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(version + "/parent", passport.isAuthenticated, passport.isAuthorized("parent"), parentController.parent);
	app.get(
		version + "/parent/children",
		passport.isAuthenticated,
		passport.isAuthorized("parent"),
		parentController.viewChildren
	);
	// app.get(
	// 	version + "/parent/children/:id",
	// 	passport.isAuthenticated,
	// 	passport.isAuthorized("parent"),
	// 	parentController.viewChild
	// );
	app.get(
		version + "/parent/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("parent"),
		parentController.vaccinesInfo
	);
	app.get(
		version + "/parent/reminders",
		passport.isAuthenticated,
		passport.isAuthorized("parent"),
		parentController.reminders
	);
	app.get(
		version + "/parent/childgrowth",
		passport.isAuthenticated,
		passport.isAuthorized("parent"),
		parentController.childGrowth
	);
	app.get(
		version + "/parent/vaccineschedule/:id",
		passport.isAuthenticated,
		passport.isAuthorized("parent"),
		parentController.childVaccineSchedule
	);
};
