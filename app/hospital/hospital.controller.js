const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	users = mongoose.model("userAccounts"),
	children = mongoose.model("Children"),
	hospitalVaccines = mongoose.model("organizationVaccines"),
	stockRequest = mongoose.model("subadminVaccineRequest"),
	dailyConsumption = mongoose.model("dailyConsumption"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	reportsSchema = mongoose.model("reportsSchema"),
	otpGenerator = require("otp-generator"),
	Twilio = require("twilio");

let hospital = (req, res, next) => {
	try {
		return res.json({
			message: "Hospital",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewHospital = async (req, res, next) => {
	try {
		return res.json({
			message: "View Hospital",
			data: await users.findOne({ _id: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChildren = async (req, res, next) => {
	try {
		return res.json({
			message: "View CHildren",
			data: await children.find({ hospitalName: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChild = async (req, res, next) => {
	try {
		return res.json({
			message: "View Child",
			data: await children.findOne({ _id: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addChild = async (req, res, next) => {
	try {
		const newChild = await new children(req.body).save();
		const dob = new Date(req.body.dateOfBirth);
		const orgVacc = await hospitalVaccines.findOne({ organization: req.user._id });
		console.log("dob: ", dob);
		console.log("dob: ", new Date());
		const birth = new Date(dob.setDate(dob.getDate())).toDateString();
		const sixWeeks = new Date(dob.setDate(dob.getDate() + 2)).toDateString();
		const tenWeeks = new Date(dob.setDate(dob.getDate() + 28)).toDateString();
		const forteenWeeks = new Date(dob.setDate(dob.getDate() + 28)).toDateString();
		const nineMonths = new Date(dob.setDate(dob.getDate() + 172)).toDateString();
		const fifteenMonths = new Date(dob.setDate(dob.getDate() + 180)).toDateString();
		// console.log("dob new: ", birth);
		// console.log("dob new: ", sixWeeks);
		// console.log("dob new: ", tenWeeks);
		// console.log("dob new: ", forteenWeeks);
		// console.log("dob new: ", nineMonths);
		// console.log("dob new: ", fifteenMonths);

		const schedule = {
			child: newChild._id,
			phoneNo: newChild.contactNo,
			vaccines: {
				opv0: {
					date: birth,
					done: true,
				}, // polio
				opv1: {
					date: sixWeeks,
					done: false,
				},
				opv2: {
					date: tenWeeks,
					done: false,
				},
				opv3: {
					date: forteenWeeks,
					done: false,
				},
				measles0: {
					date: nineMonths,
					done: false,
				},
				measles1: {
					date: fifteenMonths,
					done: false,
				},
				bcg: {
					date: birth,
					done: true,
				}, // children TB
				pentavalent0: {
					date: sixWeeks,
					done: false,
				},
				pentavalent1: {
					date: tenWeeks,
					done: false,
				},
				pentavalent2: {
					date: forteenWeeks,
					done: false,
				},
				pcv0: {
					date: sixWeeks,
					done: false,
				},
				pcv1: {
					date: tenWeeks,
					done: false,
				},
				pcv2: {
					date: forteenWeeks,
					done: false,
				},
			},
		};
		const vcSchedule = await new childVaccinationSchedule(schedule).save();

		// await new dailyConsumption({
		// 	vaccineName: "opv",
		// 	child: newChild.id,
		// 	date: new Date(),
		// 	organization: req.user._id,
		// }).save();
		// await new dailyConsumption({
		// 	vaccineName: "bcg",
		// 	child: req.params.id,
		// 	date: new Date(),
		// 	organization: req.user._id,
		// }).save();

		const remainingQuantity = {
			...orgVacc.vaccines,
			opv: {
				quantity: orgVacc.vaccines.opv.quantity - 1,
			},
			bcg: {
				quantity: orgVacc.vaccines.bcg.quantity - 1,
			},
		};
		await hospitalVaccines.findByIdAndUpdate(
			{ _id: orgVacc._id },
			{ $set: { vaccines: remainingQuantity } },
			{ new: true }
		);

		console.log("Schedule: ", schedule);
		res.json({
			message: "Child added sussessfully.",
			data: {
				child: newChild,
				vaccineSchedule: vcSchedule,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let reminders = async (req, res, next) => {
	// const data = await children.find({ _id: req.params.id });
	// console.log("Data", data);
	// const mobileNumber = data[0].contactNo;
	// console.log("Mobile Number: ", mobileNumber);
	try {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = require("twilio")(accountSid, authToken);

		client.messages
			.create({
				body: "All in the game, yo",
				from: "+13203372957",
				to: "+923159499378",
			})
			.then((message) => console.log(message.sid));

		res.json({
			msg: "Message has been sent to parent's mobile number for vaccination reminder.",
			data: {
				// mobileNumber,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateChild = async (req, res, next) => {
	try {
		const child = await children.findOne({ _id: req.params.id });
		const newChild = await children.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		const orgVacc = await hospitalVaccines.findOne({ organization: req.user._id });
		var vaccineSchedule = await childVaccinationSchedule.findOne({ child: req.params.id });
		const childVaccSchedule = await childVaccinationSchedule.findOne({ child: req.params.id });
		console.log("Vaccineschedule: ", vaccineSchedule);

		if (child.vaccination[0].opv.noOfDoses !== newChild.vaccination[0].opv.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "opv",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				opv: {
					quantity: orgVacc.vaccines.opv.quantity - 1,
				},
			};
			await hospitalVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].opv.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv0: {
							date: vaccineSchedule.vaccines.opv0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv1: {
							date: vaccineSchedule.vaccines.opv1.date,
							done: true,
						},
					},
				};
			} else if (num === 2) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv2: {
							date: vaccineSchedule.vaccines.opv2.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv3: {
							done: true,
							date: vaccineSchedule.vaccines.opv3.date,
						},
					},
				};
			}
		}
		if (child.vaccination[0].measles.noOfDoses !== newChild.vaccination[0].measles.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "measles",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				measles: {
					quantity: orgVacc.vaccines.measles.quantity - 1,
				},
			};
			await hospitalVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].measles.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						measles0: {
							date: vaccineSchedule.vaccines.measles0.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						measles1: {
							date: vaccineSchedule.vaccines.measles1.date,
							done: true,
						},
					},
				};
			}
		}
		if (child.vaccination[0].bcg.noOfDoses !== newChild.vaccination[0].bcg.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "bcg",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				bcg: {
					quantity: orgVacc.vaccines.bcg.quantity - 1,
				},
			};
			await hospitalVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			vaccineSchedule = {
				child: req.params.id,
				vaccines: {
					...vaccineSchedule.vaccines,
					bcg: {
						date: vaccineSchedule.vaccines.bcg.date,
						done: true,
					},
				},
			};
		}
		if (child.vaccination[0].pentavalent.noOfDoses !== newChild.vaccination[0].pentavalent.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "pentavalent",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				pentavalent: {
					quantity: orgVacc.vaccines.pentavalent.quantity - 1,
				},
			};
			await hospitalVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].pentavalent.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent0: {
							date: vaccineSchedule.vaccines.pentavalent0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent1: {
							date: vaccineSchedule.vaccines.pentavalent1.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent2: {
							date: vaccineSchedule.vaccines.pentavalent2.date,
							done: true,
						},
					},
				};
			}
		}
		if (child.vaccination[0].pcv.noOfDoses !== newChild.vaccination[0].pcv.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "pcv",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				pcv: {
					quantity: orgVacc.vaccines.pcv.quantity - 1,
				},
			};
			await hospitalVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].pcv.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv0: {
							date: vaccineSchedule.vaccines.pcv0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv1: {
							date: vaccineSchedule.vaccines.pcv1.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv2: {
							date: vaccineSchedule.vaccines.pcv2.date,
							done: true,
						},
					},
				};
			}
		}
		// console.log("Org Vaccines: ", await hospitalVaccines.findOne({ organization: req.user._id }));
		// console.log("Schedule: ", vaccineSchedule);
		await childVaccinationSchedule.findByIdAndUpdate({ _id: childVaccSchedule._id }, vaccineSchedule, { new: true });
		// console.log(
		// 	await childVaccinationSchedule.findOne({
		// 		child: req.params.id,
		// 	})
		// );
		return res.json({
			message: "Child updated successfully.",
			data: {
				child: newChild,
				vaccineSchedule,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewVaccines = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccines data",
			data: await hospitalVaccines.find({ organization: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let checkDailyConsumption = async (req, res, next) => {
	try {
		return res.json({
			message: "Daily consumption",
			data: await dailyConsumption.find({ organization: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addVaccine = async (req, res, next) => {
	try {
		const newVaccine = await new vaccine(req.body).save();

		return res.json({
			message: "Vaccine added successfully.",
			data: { vaccine: newVaccine },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateVaccine = async (req, res, next) => {
	try {
		const newVaccine = await vaccine.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Vaccine updated successfully.",
			data: { vaccine: newVaccine },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteVaccine = async (req, res, next) => {
	await vaccine.findByIdAndDelete({ _id: req.params.id });
	try {
		return res.json({
			message: "Vaccine deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let requestVaccines = (req, res, next) => {
	try {
		return res.json({
			message: "request vaccines",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccineRequirement = async (req, res, next) => {
	try {
		let orgDailyConsumption = await dailyConsumption.find({ organization: req.user._id });
		let childrenData = await children.find({ hospitalName: req.user._id });
		let pcv = [];
		let bcg = [];
		let pentavalent = [];
		let opv = [];
		let measles = [];
		let pcvDaily = 0;
		let bcgDaily = 0;
		let pentavalentDaily = 0;
		let opvDaily = 0;
		let measlesDaily = 0;
		orgDailyConsumption.map((item) => {
			if (item.vaccineName === "pcv") {
				pcv.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					pcvDaily += 1;
				}
			} else if (item.vaccineName === "bcg") {
				bcg.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					bcgDaily += 1;
				}
			} else if (item.vaccineName === "opv") {
				opv.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					opvDaily += 1;
				}
			} else if (item.vaccineName === "pentavalent") {
				pentavalent.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					pentavalentDaily += 1;
				}
			} else if (item.vaccineName === "measles") {
				measles.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					measlesDaily += 1;
				}
			}
		});
		// console.log(orgDailyConsumption);
		console.log("opv: ", opvDaily);
		console.log("bcg: ", bcgDaily);
		console.log("pcv: ", pcvDaily);
		console.log("pentavalent: ", pentavalentDaily);
		console.log("measles: ", measlesDaily);

		let requirements = {
			opv: {
				sevenDays:
					opvDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 10) / 100)
						: Math.ceil(opvDaily * 7 + (opvDaily * 7 * 10) / 100),
				thirtyDays:
					opvDaily === 0
						? Math.ceil(childrenData.length * 4 + (childrenData.length * 4 * 20) / 100)
						: Math.ceil(opvDaily * 30 + (opvDaily * 30 * 10) / 100),
			},
			bcg: {
				sevenDays:
					bcgDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 10) / 100)
						: Math.ceil(bcgDaily * 7 + (bcgDaily * 7 * 10) / 100),
				thirtyDays:
					bcgDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 20) / 100)
						: Math.ceil(bcgDaily * 30 + (bcgDaily * 30 * 10) / 100),
			},
			pcv: {
				sevenDays:
					pcvDaily === 0
						? Math.ceil(childrenData.length * 1.5 + (childrenData.length * 1.5 * 10) / 100)
						: Math.ceil(pcvDaily * 7 + (pcvDaily * 7 * 10) / 100),
				thirtyDays:
					pcvDaily === 0
						? Math.ceil(childrenData.length * 3 + (childrenData.length * 1.5 * 30) / 100)
						: Math.ceil(pcvDaily * 30 + (pcvDaily * 30 * 10) / 100),
			},
			pentavalent: {
				sevenDays:
					pentavalentDaily === 0
						? Math.ceil(childrenData.length * 1.5 + (childrenData.length * 1.5 * 10) / 100)
						: Math.ceil(pentavalentDaily * 7 + (pentavalentDaily * 7 * 10) / 100),
				thirtyDays:
					pentavalentDaily === 0
						? Math.ceil(childrenData.length * 3 + (childrenData.length * 1.5 * 35) / 100)
						: Math.ceil(pentavalentDaily * 30 + (pentavalentDaily * 30 * 10) / 100),
			},
			measles: {
				sevenDays:
					measlesDaily === 0
						? Math.ceil(childrenData.length + (childrenData.length * 10) / 100)
						: Math.ceil(measlesDaily * 7 + (measlesDaily * 7 * 10) / 100),
				thirtyDays:
					measlesDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 20) / 100)
						: Math.ceil(measlesDaily * 30 + (measlesDaily * 30 * 10) / 100),
			},
		};

		return res.json({
			message: "Vaccine requirements",
			data: {
				requirements,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let certificates = (req, res, next) => {
	try {
		return res.json({
			message: "delete subadmin",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let requestVaccineStock = async (req, res, next) => {
	try {
		const data = {
			vaccine: req.body.vaccine,
			quantity: req.body.quantity,
			orgName: req.user.name,
			orgCity: req.user.address.city,
			organization: req.user,
		};
		const newRequest = await new stockRequest(data).save();

		return res.json({
			message: "Vaccine stock request sent successfully.",
			data: { newRequest },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinatedNonVaccinated = async (req, res, next) => {
	const childrenData = await children.find({ hospitalName: req.user._id });
	let vaccinated = 0;
	let nonVaccinated = 0;
	childrenData.map((item) => {
		// console.log("VAccine", item.vaccination);
		if (
			item.vaccination[0].opv.noOfDoses === 4 &&
			item.vaccination[0].measles.noOfDoses === 2 &&
			item.vaccination[0].bcg.noOfDoses === 1 &&
			item.vaccination[0].pentavalent.noOfDoses === 3 &&
			item.vaccination[0].pcv.noOfDoses === 3
		) {
			vaccinated += 1;
		} else {
			nonVaccinated += 1;
		}
	});
	try {
		return res.json({
			message: "Vaccinated non vaccinated stats",
			data: {
				vaccinated,
				nonVaccinated,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childBornStats = async (req, res, next) => {
	const childrenData = await children.find({ hospitalName: req.user._id });
	let bornToday = 0;
	let bornSevenDays = 0;
	let bornOneMonth = 0;
	let today = new Date();
	let sevenDaysInMs = 86400000 * 7;
	let thirtyDaysInMs = 86400000 * 30;
	childrenData.map((item) => {
		let d = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
		let dob = new Date(item.dateOfBirth);
		let b = dob.getFullYear() + "-" + (dob.getMonth() + 1) + "-" + dob.getDate();
		if (b === d) {
			bornToday += 1;
		}
		dob.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		if (today - dob < sevenDaysInMs) {
			bornSevenDays += 1;
		}
		if (today - dob < thirtyDaysInMs) {
			bornOneMonth += 1;
		}
	});
	try {
		return res.json({
			message: "Child daily stats",
			data: {
				bornToday,
				bornSevenDays,
				bornOneMonth,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

const reports = async (req, res, next) => {
	try {
		const childrenData = await children.find({ hospitalName: req.user._id });
		let childrenVaccines = await childVaccinationSchedule.find().populate({
			path: "child",
			match: {
				hospitalName: req.user._id,
			},
		});
		childrenVaccines = childrenVaccines.filter((item) => item.child != null);

		// childrenVaccines.length > 0 &&
		// 	childrenVaccines.map((item, i) => {
		// 		console.log("Iteration: ", i);
		// 		if (item.child.hospitalName === req.user._id) {
		// 			vc.push(item);
		// 		}
		// 	});
		console.log("Children vaccines: ", childrenVaccines[0].child.hospitalName === req.user._id);
		console.log("Hospital name: ", childrenVaccines.length);

		let nonVaccinatedChildren = [];
		const today = new Date();
		let sevenDaysInMs = 86400000 * 7;
		let threeDaysInMs = 86400000 * 3;
		let thirtyDaysInMs = 86400000 * 30;

		childrenVaccines.length > 0 &&
			childrenVaccines.map((item, index) => {
				// console.log("Children vaccines: ", item.child.hospitalName == req.user._id);
				if (item !== null) {
					today.setHours(0, 0, 0, 0);
					let d1 = new Date(item.vaccines.opv1.date);
					// console.log(d1);
					let d1Done = item.vaccines.opv1.done;
					// console.log(d1Done);
					let d2 = new Date(item.vaccines.opv2.date);
					// console.log(d2);
					let d2Done = item.vaccines.opv2.done;
					// console.log(d2Done);
					let d3 = new Date(item.vaccines.opv3.date);
					// console.log(d3);
					let d3Done = item.vaccines.opv3.done;
					// console.log(d3Done);
					let d4 = new Date(item.vaccines.measles0.date);
					// console.log(d4);
					let d4Done = item.vaccines.measles0.done;
					// console.log(d4Done);
					let d5 = new Date(item.vaccines.measles1.date);
					// console.log(d5);
					let d5Done = item.vaccines.measles1.done;
					// console.log(d5Done);

					if (
						(d1.setHours(0, 0, 0, 0) + threeDaysInMs < today && d1Done === false) ||
						(d2.setHours(0, 0, 0, 0) + threeDaysInMs < today && d2Done === false) ||
						(d3.setHours(0, 0, 0, 0) + threeDaysInMs < today && d3Done === false) ||
						(d4.setHours(0, 0, 0, 0) + threeDaysInMs < today && d4Done === false) ||
						(d5.setHours(0, 0, 0, 0) + threeDaysInMs < today && d5Done === false)
					) {
						nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
					}
					// if (d2.setHours(0, 0, 0, 0) + threeDaysInMs < today && d2Done === false) {
					// 	nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
					// }
					// if (d3.setHours(0, 0, 0, 0) + threeDaysInMs < today && d3Done === false) {
					// 	nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
					// }
					// if (d4.setHours(0, 0, 0, 0) + threeDaysInMs < today && d4Done === false) {
					// 	nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
					// }
					// if (d5.setHours(0, 0, 0, 0) + threeDaysInMs < today && d5Done === false) {
					// 	nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
					// }
				}
			});
		// await new reportsSchema({
		// 	org: req.user._id,
		// 	chiildren: nonVaccinatedChildren,
		// }).save();

		// console.log(nonVaccinatedChildren);
		return res.json({
			message: "Non Vaccinated Children Reports",
			data: {
				nonVaccinatedChildren,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccineSchedule = async (req, res, next) => {
	try {
		let schedule = await childVaccinationSchedule.find({});
		schedule.map((item) => {
			Object.keys(item.vaccines).map((vacc) => {
				console.log("item: ", item.vaccines[vacc]);
			});
		});
		return res.json({
			message: "Vaccine schedule",
			data: schedule,
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let oneTimePassword = async (req, res, next) => {
	try {
		let oneTimePass = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });
		let child = await children.findOne({ _id: req.params.id });
		let contacts = [child.contactNo, child.emergencyContact];
		console.log("Contacts: ", contacts);
		// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
		// contacts.forEach(function (contact) {
		// 	const options = {
		// 		to: `${contact}`,
		// 		from: process.env.TWILIO_PHONE_NUMBER,
		// 		body: `OTP for child vaccination is ${oneTimePass}`,
		// 	};
		// 	// Send the message!
		// 	client.messages.create(options, function (err, response) {
		// 		if (err) {
		// 			console.error(err);
		// 		} else {
		// 			let masked = contact.substr(0, contact.length - 5);
		// 			masked += "*****";
		// 			winston.info(`Message sent to ${masked}`);
		// 		}
		// 	});
		// });
		return res.json({
			message: "OTP",
			data: { otp: oneTimePass },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let hospitalReports = async (req, res, next) => {
	try {
		let report = {
			org: req.user._id,
			children: req.body,
		};
		let reports = await new reportsSchema(report).save();
		return res.json({
			message: "Hospital Reports",
			data: reports,
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

let sendReport = async (req, res, next) => {
	console.log("Request.body: ", req.body);
	let report = {
		children: req.body,
		org: req.user,
	};
	try {
		return res.json({
			message: "Non vaccinated children report.",
			data: await new reportsSchema(report).save(),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	hospital,
	viewHospital,
	viewChildren,
	viewChild,
	addChild,
	updateChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	requestVaccines,
	reminders,
	vaccineRequirement,
	certificates,
	requestVaccineStock,
	vaccinatedNonVaccinated,
	childBornStats,
	checkDailyConsumption,
	reports,
	vaccineSchedule,
	oneTimePassword,
	hospitalReports,
	childVaccineSchedule,
	sendReport,
};
