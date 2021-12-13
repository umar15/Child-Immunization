"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const childFollowUpSchema = new schema({
	child: { type: schema.Types.ObjectId, required: true, ref: "Children" },
	date: { type: Date, default: Date.now() },
	vaccineName: { type: String, required: true },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	confirmationCode: { type: String, default: "" },
});

childFollowUpSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("childFollowUp", childFollowUpSchema);
