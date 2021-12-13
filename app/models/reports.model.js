"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const reportsSchema = new schema({
	org: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	children: { type: [schema.Types.ObjectId], ref: "Children" },
});

reportsSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("reportsSchema", reportsSchema);
