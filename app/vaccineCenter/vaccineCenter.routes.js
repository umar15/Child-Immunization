const vaccineCenterController = require("./vaccineCenter.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/vaccinecenter",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.vaccineCenter
	);
	app.get(
		version + "/vaccinecenter/children",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.viewChildren
	);
	app.get(
		version + "/vaccinecenter/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.viewChild
	);
	app.put(
		version + "/vaccinecenter/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.updateChild
	);
	app.get(
		version + "/vaccinecenter/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.viewVaccines
	);
	app.post(
		version + "/vaccinecenter/vaccines/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.addVaccine
	);
	app.delete(
		version + "/vaccinecenter/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.deleteVaccine
	);
	app.put(
		version + "/vaccinecenter/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.updateVaccine
	);
	app.get(
		version + "/vaccinecenter/campaigns",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.viewCampaigns
	);
	app.post(
		version + "/vaccinecenter/campaigns/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.addCampaigns
	);
	app.delete(
		version + "/vaccinecenter/campaigns/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.deleteCampaigns
	);
	app.put(
		version + "/vaccinecenter/campaigns/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.updateCampaigns
	);
	app.get(
		version + "/vaccinecenter/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.futureCases
	);
	app.get(
		version + "/vaccinecenter/futurevaccineneeds",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.futureCases
	);
	app.get(
		version + "/vaccinecenter/campaigns/notify/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.notifyPublic
	);

	app.get(
		version + "/vaccinecenter/workers",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.viewWorkers
	);
	app.post(
		version + "/vaccinecenter/workers/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.addWorker
	);
	app.delete(
		version + "/vaccinecenter/workers/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.deleteWorker
	);
	app.put(
		version + "/vaccinecenter/workers/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.updateWorker
	);
	app.post(
		version + "/vaccinecenter/requestvaccinestock",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.requestVaccineStock
	);
	app.post(
		version + "/vaccinecenter/sendreport",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.sendReport
	);
	app.get(
		version + "/vaccinecenter/childvaccineschedule/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.childVaccineSchedule
	);
	app.get(
		version + "/vaccinecenter/hospital/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.getHospital
	);
	app.get(
		version + "/vaccinecenter/otp/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.oneTimePassword
	);
	app.get(
		version + "/vaccinecenter/vaccinereports",
		passport.isAuthenticated,
		passport.isAuthorized("vaccinecenter"),
		vaccineCenterController.reports
	);
};
