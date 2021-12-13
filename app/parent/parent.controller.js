const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	children = mongoose.model("Children");

let parent = (req, res, next) => {
	try {
		return res.json({
			message: "Parent",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

// let viewChildren = async (req, res, next) => {
// 	try {
// 		return res.json({
// 			message: "View Children",
// 			data: await children.find({}),
// 		});
// 	} catch (err) {
// 		winston.error(err);
// 		res.redirect("/error");
// 	}
// };
let viewChildren = async (req, res, next) => {
	try {
		let child = await children.findOne({ parentCNIC: req.user.cnic });
		return res.json({
			message: "View Child",
			data: child,
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinesInfo = (req, res, next) => {
	try {
		return res.json({
			message: "vaccines info.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let reminders = (req, res, next) => {
	try {
		return res.json({
			message: "reminders",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childGrowth = (req, res, next) => {
	try {
		return res.json({
			message: "child growth.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childVaccineSchedule = async (req, res, next) => {
	try {
		return res.json({
			message: "Child Vaccination Schedule",
			data: await childVaccinationSchedule.find({ child: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	parent,
	viewChildren,
	// viewChild,
	childGrowth,
	reminders,
	vaccinesInfo,
	childVaccineSchedule,
};
