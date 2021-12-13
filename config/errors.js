const glob = require("glob"),
	_ = require("lodash"),
	fs = require("fs"),
	winston = require("./winston");

winston.info("error messages are loading ...");
let routePath = "app/modules/**/*.error.json";

// initialising with common error message objects
let errorObject = {
	1: {
		msg: {
			EN: "User does not exist.",
		},
	},
	2: {
		msg: {
			EN: "Incorrect password.",
		},
	},
	3: {
		msg: {
			EN: "User is not authenticated.",
		},
	},
	4: {
		msg: {
			EN: "User is not authorized to visit the api.",
		},
	},
};

glob.sync(routePath).forEach(function (file) {
	let errorFile = fs.readFileSync(file, "utf-8");
	if (errorFile.length >= 10) {
		_.extend(errorObject, JSON.parse(errorFile));
		winston.info(file + " is loaded");
	}
});

module.exports = errorObject;
