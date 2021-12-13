"use strict";
const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp"),
	Twilio = require("twilio"),
	winston = require("../../config/winston");
// vaccinationSchedule = mongoose.model("childVaccinationSchedule");

const schema = mongoose.Schema;

const childVaccinationSchedule = new schema({
	child: { type: schema.Types.ObjectId, required: true, default: "", ref: "Children" },
	phoneNo: { type: String, required: true },
	vaccines: {
		opv0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		}, // polio
		opv1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		opv2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		opv3: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		measles0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		measles1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		bcg: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		}, // children TB
		pentavalent0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pentavalent1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pentavalent2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
	},
});
childVaccinationSchedule.plugin(mongoose_timestamps);

childVaccinationSchedule.statics.sendNotifications = async (callback) => {
	let reminders = [];
	let nextDayReminders = [];
	let schedules = await vaccinationSchedule.find({});
	// console.log("Schedules: ", schedules);
	schedules.map((item) => {
		Object.keys(item.vaccines).map((vacc) => {
			let d = new Date(item.vaccines[vacc].date);
			new Date(d.setDate(d.getDate() - 1));
			let dday = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			// console.log("dday: ", dday);
			let today = new Date();
			const tday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
			// console.log("tday: ", tday);
			if (dday == tday) {
				reminders.push({ date: item.vaccines[vacc].date, phoneNo: item.phoneNo, child: item.child });
			}

			let nextDay = new Date(item.vaccines[vacc].date);
			new Date(nextDay.setDate(nextDay.getDate() + 1));
			const nextDDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate();

			if (item.vaccines[vacc].done === false && nextDDay == tday) {
				nextDayReminders.push({ date: item.vaccines[vacc].date, phoneNo: item.phoneNo, child: item.child });
			}
		});
	});
	console.log("Reminders: ", reminders);
	console.log("next day Reminders: ", nextDayReminders);
	var flags = {};
	var uniqueReminders = [];
	reminders.filter((reminder) => {
		if (!flags[reminder.child]) {
			flags[reminder.child] = true;
			uniqueReminders.push(reminder);
		}
	});
	console.log("Reminders: ", uniqueReminders);

	var flagsNext = {};
	var uniqueRemindersNext = [];
	nextDayReminders.filter((reminder) => {
		if (!flagsNext[reminder.child]) {
			flagsNext[reminder.child] = true;
			uniqueRemindersNext.push(reminder);
		}
	});
	console.log("Reminders: ", uniqueReminders);
	console.log("next day Reminders: ", uniqueRemindersNext);

	if (reminders.length > 0) {
		sendNotifications(uniqueReminders);
	}
	if (nextDayReminders.length > 0) {
		sendNextNotifications(uniqueRemindersNext);
	}

	function sendNotifications(schedules) {
		const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
		schedules.forEach(function (schedule) {
			// Create options to send the message
			const options = {
				to: `${schedule.phoneNo}`,
				from: process.env.TWILIO_PHONE_NUMBER,
				/* eslint-disable max-len */
				body: `Hi. Just a reminder that you have a vaccination of your child tomorrow date: ${new Date(
					schedule.date
				).toDateString()}. +
				Kindly visit nearest vaccination center or hospital for vaccination of your child. +
				Thanks.`,
				/* eslint-enable max-len */
			};

			// Send the message!
			client.messages.create(options, function (err, response) {
				if (err) {
					// Just log it for now
					console.error(err);
				} else {
					// Log the last few digits of a phone number
					let masked = schedule.phoneNo.substr(0, schedule.phoneNo.length - 5);
					masked += "*****";
					winston.info(`Message sent to ${masked}`);
				}
			});
		});

		// Don't wait on success/failure, just indicate all messages have been
		// queued for delivery
		if (callback) {
			callback.call();
		}
	}

	function sendNextNotifications(schedules) {
		const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
		schedules.forEach(function (schedule) {
			// Create options to send the message
			const options = {
				to: `${schedule.phoneNo}`,
				from: process.env.TWILIO_PHONE_NUMBER,
				/* eslint-disable max-len */
				body: `Hi. Just a reminder that you had a vaccination of your child yesterday date: ${new Date(
					schedule.date
				).toDateString()}. +
				Kindly visit nearest vaccination center or hospital for vaccination of your child. +
				Thanks.
				`,
				/* eslint-enable max-len */
			};

			// Send the message!
			client.messages.create(options, function (err, response) {
				if (err) {
					// Just log it for now
					console.error(err);
				} else {
					// Log the last few digits of a phone number
					let masked = schedule.phoneNo.substr(0, schedule.phoneNo.length - 5);
					masked += "*****";
					winston.info(`Message sent to ${masked}`);
				}
			});
		});

		// Don't wait on success/failure, just indicate all messages have been
		// queued for delivery
		if (callback) {
			callback.call();
		}
	}
};

const vaccinationSchedule = mongoose.model("childVaccinationSchedule", childVaccinationSchedule);
module.exports = vaccinationSchedule;
