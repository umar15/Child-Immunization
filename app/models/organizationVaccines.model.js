"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const organizationVaccinesSchema = new schema({
	organization: { type: schema.Types.ObjectId, required: true, default: "", ref: "userAccounts" },
	vaccines: {
		opv: { quantity: Number, default: 0 }, // polio
		measles: { quantity: Number, default: 0 },
		bcg: { quantity: Number, default: 0 }, // children TB
		pentavalent: { quantity: Number, default: 0 },
		pcv: { quantity: Number, default: 0 },
	},
});

organizationVaccinesSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("organizationVaccines", organizationVaccinesSchema);
