"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const subadminVaccineRequestSchema = new schema({
	vaccine: { type: String, default: "", required: true },
	quantity: { type: Number, default: "" },
	orgName: { type: String, default: "", required: true },
	orgCity: { type: String, default: "", required: true },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
});

subadminVaccineRequestSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("subadminVaccineRequest", subadminVaccineRequestSchema);
