const polioWorkerController = require("./polioWorker.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/polioworker",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.polioWorker
	);
	app.put(
		version + "/polioworker/children",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.viewChildren
	);
	app.post(
		version + "/polioworker/sendreport",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.sendReport
	);
	app.put(
		version + "/polioworker/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.updateChild
	);
	app.get(
		version + "/polioworker/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.vaccinesInfo
	);
	app.get(
		version + "/polioworker/reminders",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.polioSymptoms
	);
	app.get(
		version + "/polioworker/childgrowth",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.childGrowth
	);
	app.get(
		version + "/polioworker/otp/:id",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.oneTimePassword
	);
	app.get(
		version + "/polioworker/schedule/:id",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.vaccinationSchedule
	);
	app.get(
		version + "/polioworker/nonvaccinatedchildren",
		passport.isAuthenticated,
		passport.isAuthorized("worker"),
		polioWorkerController.reports
	);
};
