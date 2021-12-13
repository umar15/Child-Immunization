"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const otp = new schema({
	code: { type: String, default: "", required: true },
});

otp.plugin(mongoose_timestamps);
module.exports = mongoose.model("otp", otp);
