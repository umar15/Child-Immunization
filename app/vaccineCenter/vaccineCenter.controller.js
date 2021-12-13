const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	campaign = mongoose.model("Campaign"),
	orgVaccines = mongoose.model("organizationVaccines"),
	users = mongoose.model("userAccounts"),
	vaccineRequest = mongoose.model("subadminVaccineRequest"),
	dailyConsumption = mongoose.model("dailyConsumption"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	reportsSchema = mongoose.model("reportsSchema"),
	otpGenerator = require("otp-generator"),
	Twilio = require("twilio");

let vaccineCenter = (req, res, next) => {
	try {
		return res.json({
			message: "vaccine Center",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChildren = async (req, res, next) => {
	try {
		return res.json({
			message: "View Children",
			data: await children.find({}),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChild = async (req, res, next) => {
	try {
		return res.json({
			message: "Child",
			data: await children.findOne({ _id: req.params.id }),
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
		const orgVacc = await orgVaccines.findOne({ organization: req.user._id });
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
			await orgVaccines.findByIdAndUpdate(
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
			await orgVaccines.findByIdAndUpdate(
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
			await orgVaccines.findByIdAndUpdate(
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
			await orgVaccines.findByIdAndUpdate(
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
			await orgVaccines.findByIdAndUpdate(
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
		// console.log("Org Vaccines: ", await orgVaccines.findOne({ organization: req.user._id }));
		console.log("Schedule: ", "vaccineSchedule");
		await childVaccinationSchedule.findByIdAndUpdate({ _id: childVaccSchedule._id }, vaccineSchedule);
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
			data: await orgVaccines.find({ organization: req.user._id }),
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

let viewCampaigns = async (req, res, next) => {
	try {
		return res.json({
			message: "campaigns",
			data: await campaign.find({ vaccineCenter: req.user._id }).populate("vaccineCenter").populate("workers"),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addCampaigns = async (req, res, next) => {
	try {
		const newCampaign = await new campaign(req.body).save();
		return res.json({
			message: "Campaign added successfully.",
			data: {
				campaign: newCampaign,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateCampaigns = async (req, res, next) => {
	try {
		const newCampaign = await campaign.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "campaign updated successfully.",
			data: {
				campaign: newCampaign,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteCampaigns = async (req, res, next) => {
	try {
		await campaign.findByIdAndDelete({ _id: req.params.id });
		return res.json({
			message: "Campaign deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let futureCases = (req, res, next) => {
	try {
		return res.json({
			message: "future cases",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let notifyPublic = async (req, res, next) => {
	try {
		// const accountSid = process.env.TWILIO_ACCOUNT_SID;
		// const authToken = process.env.TWILIO_AUTH_TOKEN;
		// const client = require("twilio")(accountSid, authToken);
		const publicUsers = await children.find({ "address.area": req.user.address.area });
		const phoneNo = publicUsers.map((user) => user.contactNo);
		// console.log(phoneNo);
		// phoneNo.map((num) => {
		// 	client.messages
		// 		.create({
		// 			body: "There will be a vaccination campaign in your area on 12 Oct, 2021. Be at home and help us vaccinate your child. Thanks",
		// 			from: "+15017122661",
		// 			to: num,
		// 		})
		// 		.then((message) => console.log(message.sid));
		// });

		return res.json({
			message: "Public has been notified about this campaign.",
			data: {
				phoneNo,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let futureVaccineNeeds = (req, res, next) => {
	try {
		return res.json({
			message: "future vaccine needs",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewWorkers = async (req, res, next) => {
	try {
		return res.json({
			message: "Polio workers",
			data: await users.find({ userType: "worker", parentOrg: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addWorker = async (req, res, next) => {
	try {
		const newUser = await new users(req.body).save();
		const orgVacc = {
			organization: newUser._id,
			vaccines: {
				opv: { quantity: 0 },
				measles: { quantity: 0 },
				bcg: { quantity: 0 },
				pentavalent: { quantity: 0 },
				pcv: { quantity: 0 },
			},
		};
		const newVaccines = await new orgVaccines(orgVacc).save();
		return res.json({
			message: "Polio worker added successfully.",
			data: {
				worker: newUser,
				vaccines: newVaccines,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateWorker = async (req, res, next) => {
	try {
		const newSubAdmin = await users.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Worker updated successfully.",
			data: {
				subAdmin: newSubAdmin,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteWorker = async (req, res, next) => {
	try {
		const user = await users.findByIdAndDelete({ _id: req.params.id });
		const org = await orgVaccines.findOne({ organization: user._id });
		await orgVaccines.findByIdAndDelete({ _id: org._id });
		return res.json({
			message: "Polio worker deleted successfully.",
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
		const newRequest = await new vaccineRequest(data).save();

		return res.json({
			message: "Vaccine stock request sent successfully.",
			data: { newRequest },
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
let getHospital = async (req, res, next) => {
	try {
		return res.json({
			message: "Hospital",
			data: await users.findOne({ _id: req.params.id }),
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

const reports = async (req, res, next) => {
	try {
		// const childrenData = await children.find({ hospitalName: req.user._id });
		let childrenVaccines = await childVaccinationSchedule.find().populate({
			path: "child",
			match: {
				"address.area": req.user.address.area,
			},
		});
		childrenVaccines = childrenVaccines.filter((item) => item.child != null);
		console.log("Children vaccines: ", childrenVaccines);
		console.log("user: ", req.user.address.area);

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
	vaccineCenter,
	viewChildren,
	viewChild,
	updateChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	viewCampaigns,
	addCampaigns,
	deleteCampaigns,
	updateCampaigns,
	futureCases,
	futureVaccineNeeds,
	notifyPublic,
	addWorker,
	deleteWorker,
	updateWorker,
	viewWorkers,
	requestVaccineStock,
	childVaccineSchedule,
	getHospital,
	oneTimePassword,
	sendReport,
	reports,
};
