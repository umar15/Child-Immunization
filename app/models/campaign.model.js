"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const campaignSchema = new schema({
	campaignID: { type: String, default: "", required: true },
	vaccineCenter: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	status: { type: String, default: "active", required: true, enum: ["active", "inactive"] },
	area: { type: String, default: "", required: true },
	vaccine: { type: String, default: "" },
	workers: [{ type: schema.Types.ObjectId, ref: "userAccounts" }],
	startDate: { type: Date, default: Date.now() },
	endDate: { type: Date, default: Date.now() },
});

campaignSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("Campaign", campaignSchema);
