const subadminController = require("./subadmin.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/subadmin",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.subadmin
	);
	app.get(
		version + "/subadmin/children",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.viewChildren
	);
	app.get(
		version + "/subadmin/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.viewChild
	);
	app.get(
		version + "/subadmin/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.viewVaccines
	);
	app.post(
		version + "/subadmin/vaccine/add",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.addVaccine
	);
	app.post(
		version + "/subadmin/vaccine/assign/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.assignVaccine
	);
	app.delete(
		version + "/subadmin/vaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.deleteVaccine
	);
	app.put(
		version + "/subadmin/vaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.updateVaccine
	);
	app.get(
		version + "/subadmin/hospitals",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.getHospitals
	);
	app.get(
		version + "/subadmin/hospitals/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.getHospital
	);
	app.get(
		version + "/subadmin/vaccinecenters",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.getVaccineCenters
	);
	app.get(
		version + "/subadmin/vaccinecenters/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.getVaccineCenter
	);
	app.get(
		version + "/subadmin/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.futureCases
	);
	app.get(
		version + "/subadmin/futurevaccineneeds",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.futureVaccineNeeds
	);
	app.post(
		version + "/subadmin/requestvaccinestock",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.requestVaccineStock
	);
	app.get(
		version + "/subadmin/vaccinerequests",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.vaccineRequests
	);
	app.get(
		version + "/subadmin/userrequests",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.userRequests
	);
	app.post(
		version + "/subadmin/userrequests/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.approveRequest
	);
	app.delete(
		version + "/subadmin/userrequests/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.rejectRequest
	);
	app.get(
		version + "/subadmin/childrenstatistics",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.childrenStats
	);
	app.get(
		version + "/subadmin/vaccinatednonvaccinated",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.vaccinatedNonVaccinated
	);
	app.get(
		version + "/subadmin/childvaccineschedule/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.childVaccineSchedule
	);
	app.get(
		version + "/subadmin/vaccinerequirements",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.vaccineRequirement
	);
	app.get(
		version + "/subadmin/usersvaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.userVaccinesInfo
	);
	app.post(
		version + "/subadmin/sendreport",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.sendReport
	);
	app.get(
		version + "/subadmin/childreports",
		passport.isAuthenticated,
		passport.isAuthorized("subadmin"),
		subadminController.getChildReports
	);
};
