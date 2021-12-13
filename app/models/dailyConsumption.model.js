"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const dailyConsumptionSchema = new schema({
	vaccineName: { type: String, required: true },
	child: { type: schema.Types.ObjectId, required: true, ref: "Children" },
	date: { type: Date, default: new Date(), require: true },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
});

dailyConsumptionSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("dailyConsumption", dailyConsumptionSchema);
