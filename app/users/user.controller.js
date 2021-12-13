const winston = require("../../config/winston"),
	passport = require("../../config/passport"),
	mongoose = require("mongoose"),
	userAccountModel = mongoose.model("userAccounts"),
	orgVaccines = mongoose.model("organizationVaccines"),
	userRequests = mongoose.model("userRequests"),
	nodemailer = require("nodemailer"),
	bcrypt = require("bcryptjs"),
	SALT_WORK_FACTOR = 10;

let getUsers = async (req, res, next) => {
	try {
		filters = {
			"address.city": "Rawalpindi",
		};
		let users = await userAccountModel.find(filters);
		let noOfUsers = await userAccountModel.countDocuments(filters);

		return res.json({
			message: "Users fetched successfully.",
			data: {
				users,
				noOfUsers,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		filters = { _id: id };
		let user = await userAccountModel.findOne(filters);

		if (user) {
			return res.json({
				message: "User fetched successfully.",
				data: {
					user,
				},
			});
		} else {
			return res.json({
				message: "User not found!",
				data: {},
			});
		}
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		let newPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
		let user = {
			...req.body,
			password: newPassword,
		};
		await userAccountModel.findByIdAndUpdate({ _id: id }, user, { new: true });
		return res.json({
			message: "User updated successfully.",
			data: {
				user,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		await userAccountModel.deleteOne({ _id: id });

		return res.json({
			message: "User deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let createUser = async (req, res, next) => {
	try {
		// Mail to user
		var options = {
			service: "SendGrid",
			auth: {
				user: "apikey",
				pass: process.env.SENDGRID_KEY,
			},
		};
		var transporter = nodemailer.createTransport(options);

		if (req.body.userType === "hospital" || req.body.userType === "vaccinecenter") {
			console.log("Files: ", req.file);
			const a = JSON.parse(req.body.address[1]);
			console.log("address: ", a);
			const newRequest = {
				...req.body,
				address: a,
				permit: req.file.filename,
			};
			// console.log("New Request: ", newRequest);

			console.log("Key: ", process.env.SENDGRID_KEY);

			var mailOptions = {
				from: "sp18-bcs-164@student.comsats.edu.pk",
				to: req.body.email,
				subject: "CVS Signup request successfull.",
				text:
					"Thank you for choosing us. \n\n" +
					"Your signup request has been successfully send to your area admin. \n" +
					"Kindly wait for some time while you request is being reviewed. \n" +
					"You will be notified when your signup request is accepted or rejected. \n\n" +
					"Thanks for your patience!",
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email has been sent to: " + info.response);
				}
			});

			await new userRequests(newRequest).save();
			return res.json({
				message: "Signup request sent successfully. Please wait for approval",
				data: newRequest,
			});
		} else {
			const newUser = await new userAccountModel(req.body).save();
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
			var mailOptions = {
				from: "sp18-bcs-164@student.comsats.edu.pk",
				to: req.body.email,
				subject: "CVS Signup successfull.",
				text:
					"Thank you for choosing us. \n\n" +
					"Your account has been created successfully. \n" +
					"Kindly login with your credentials. \n" +
					"Thanks for your patience!",
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email has been sent to: " + info.response);
				}
			});
			return res.json({
				message: "New user added successfully.",
				data: {
					user: newUser,
					vaccines: newVaccines,
				},
			});
		}
	} catch (err) {
		winston.error(err);
		next(err);
		res.redirect("/error");
	}
};

let logInUser = (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(info);
		}

		req.logIn(user, function (err) {
			if (err) {
				winston.error(err);
				return next({ msgCode: 114 });
			}
			return next();
		});
	})(req, res, next);
};

let sendSignInSuccess = async (req, res, next) => {
	let copy = JSON.stringify(req.user);
	copy = JSON.parse(copy);
	copy.password = undefined;
	copy.resetPasswordExpires = undefined;
	copy.resetPasswordToken = undefined;

	return res.json({
		message: "SignIn successfull",
		data: {
			user: copy,
			session: req.session,
		},
	});
};

let sendCurrentUser = (req, res, next) => {
	return res.json({
		success: 1,
		message: "Current user.",
		data: {
			user: req.user,
		},
	});
};

let logout = function (req, res, next) {
	req.logout();
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		return res.json({
			success: 1,
			message: "Logged Out",
			data: {},
		});
	});
};

module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	createUser,
	logInUser,
	sendSignInSuccess,
	logout,
	sendCurrentUser,
};
