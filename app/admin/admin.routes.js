const adminController = require("./admin.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(version + "/admin", passport.isAuthenticated, passport.isAuthorized("admin"), adminController.admin);
	// app.get(
	// 	version + "/admin/children",
	// 	passport.isAuthenticated,
	// 	passport.isAuthorized("admin"),
	// 	adminController.viewChildren
	// );
	app.get(
		version + "/admin/children/:id/:areaid",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewChildren
	);
	app.get(
		version + "/admin/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewVaccines
	);
	app.post(
		version + "/admin/vaccines/add",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.addVaccine
	);
	app.delete(
		version + "/admin/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.deleteVaccine
	);
	app.put(
		version + "/admin/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.updateVaccine
	);
	app.get(
		version + "/admin/gethospitals/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewHospitals
	);
	app.get(
		version + "/admin/hospitals/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.getHospital
	);
	app.get(
		version + "/admin/getvaccinecenters/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewVaccineCenters
	);
	app.get(
		version + "/admin/vaccinecenters/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.getVaccineCenter
	);
	app.get(
		version + "/admin/subadmins",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewSubAdmins
	);
	app.post(
		version + "/admin/subadmins/add",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.addSubAdmin
	);
	app.delete(
		version + "/admin/subadmins/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.deleteSubAdmin
	);
	app.put(
		version + "/admin/subadmins/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.updateSubAdmin
	);
	app.post(
		version + "/admin/subadmins/assignvaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.assignVaccine
	);
	app.get(
		version + "/admin/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.futureCases
	);
	app.get(
		version + "/admin/vaccinerequirements/:id/:areaid",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.vaccineRequirement
	);
	app.get(
		version + "/admin/vaccinerequests",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.vaccineStockRequests
	);
	app.get(
		version + "/admin/childrenstatistics/:id/:areaid",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.childrenStats
	);
	app.get(
		version + "/admin/vaccinatednonvaccinated/:id/:areaid",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.vaccinatedNonVaccinated
	);
	app.get(
		version + "/admin/usersvaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.userVaccinesInfo
	);
	app.get(
		version + "/admin/childvaccineschedule/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.childVaccineSchedule
	);
	app.get(
		version + "/admin/assignedvaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.getUserAssignedVaccines
	);
	app.get(
		version + "/admin/nonvaccinatedreports",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.nonVaccinatedChildrenReports
	);
};
