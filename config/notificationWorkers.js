"use strict";

const vaccinationSchedule = require("../app/models/childVaccinationSchedule.model");

const notificationWorkerFactory = function () {
	return {
		run: function () {
			vaccinationSchedule.sendNotifications();
		},
	};
};

module.exports = notificationWorkerFactory();
