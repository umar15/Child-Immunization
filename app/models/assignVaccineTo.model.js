"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const assignVaccineToSchema = new schema({
	vaccine: { type: String, required: true },
	date: { type: Date, default: Date.now(), require: true },
	quantity: { type: Number, default: "" },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	assignedBy: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
});

assignVaccineToSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("assignVaccineTo", assignVaccineToSchema);
