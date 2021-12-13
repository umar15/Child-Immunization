"use strict";

const CronJob = require("cron").CronJob;
const notificationsWorker = require("./notificationWorkers");
const winston = require("./winston");

const schedulerFactory = function () {
	return {
		start: function () {
			new CronJob(
				"00 * * * * *",
				function () {
					winston.info("Running Send Notifications Worker.");
					notificationsWorker.run();
				},
				null,
				true,
				""
			);
		},
	};
};

module.exports = schedulerFactory();
