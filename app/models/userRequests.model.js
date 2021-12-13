"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp"),
	bcrypt = require("bcryptjs"),
	SALT_WORK_FACTOR = 10,
	schema = mongoose.Schema;

let userRequests = new schema({
	email: { type: String, default: "", required: true, unique: true },
	name: { type: String, default: "", required: true },
	cnic: { type: String, default: "" },
	parentOrg: { type: schema.Types.ObjectId, ref: "userAccounts" },
	phoneNo: { type: String, default: "", unique: false },
	userType: {
		type: String,
		default: "",
		required: true,
		enum: ["hospital", "vaccinecenter", "parent", "worker", "admin", "subadmin"],
	},
	password: { type: String, default: "", required: true },
	permit: { type: String, default: "" },
	profilePicture: { type: String, default: "" },
	address: {
		addr: { type: String, default: "", required: true },
		area: { type: String, default: "", required: true },
		city: { type: String, default: "", required: true },
	},
});

userRequests.plugin(mongoose_timestamps);
userRequests.index({ email: 1 }, { background: true, unique: true, name: "IDX_EMAIL" });

userRequests.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userRequests.pre("save", async function (next) {
	try {
		var user = this;
		// only hash the password if it has been modified (or is new)
		if (!user.isModified("password")) return next();

		// generate a salt
		let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		console.log("Password Salt", salt);

		let hash = await bcrypt.hash(user.password, salt);
		console.log("Password Hash: ", hash);

		// override the cleartext password with the hashed one
		user.password = hash;
		next();
	} catch (err) {
		return next(err);
	}
});

module.exports = mongoose.model("userRequests", userRequests);
