"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const vaccineSchema = new schema({
	name: { type: String, default: "", required: true },
	manufacturer: { type: String, default: "", required: true },
	quantity: { type: Number, default: 50, required: true },
	expiryDate: { type: Date, default: Date.now, required: true },
});

vaccineSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("Vaccine", vaccineSchema);
