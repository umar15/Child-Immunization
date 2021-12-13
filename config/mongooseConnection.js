const asyncLib = require("async"),
	path = require("path"),
	glob = require("glob"),
	mongoose = require("mongoose"),
	winston = require("./winston"),
	env = process.env.NODE_ENV || "development";

global.config = {};

module.exports = function (callback) {
	asyncLib.series(
		[
			(envCb) => {
				glob("config/env/*.json", (err, files) => {
					if (err) {
						return envCb(err);
					} else {
						global.config = require(path.join(__dirname, "env", env + ".js"));
						winston.info(global.config);
						if (!global.config) {
							return envCb("Error occured while loading the configuration file.");
						} else {
							winston.info("Loaded config file: " + env);
							// winston.info("Try to connect mongodb." + global.config.mongodb.host);
							winston.info("Try to connect mongodb.");

							if (!mongoose.connection.readyState) {
								mongoose.connect(global.config.mongodb.host, {
									useNewUrlParser: true,
									useUnifiedTopology: true,
									useCreateIndex: true,
								});

								// on connection
								mongoose.connection.on("connected", function () {
									// winston.info("mongoose connection open." + global.config.mongodb.host);
									winston.info("mongoose connection open.");
									// Enabling mongoose debug mode if required
									mongoose.set("debug", global.config.mongodb.enableMongoDebugging);
									return envCb();
								});

								// on error
								mongoose.connection.on("error", function (err) {
									//   if you get error for the first time when this gets started make sure to run mongodb
									return envCb(err);
								});

								// on disconnection
								mongoose.connection.on("disconnected", function () {
									return envCb("mongoose connection disconnected");
								});
							} else {
								return envCb();
							}
						}
					}
				});
			},
			(modelsCb) => {
				// load all models
				glob("app/**/*.model.js", (err, files) => {
					if (err) {
						return modelsCb(err);
					} else {
						winston.info("models are loading ...");
						files.forEach(function (file) {
							require(path.join(__dirname, "../", file));
						});
						winston.info("Models loaded");
						return modelsCb();
					}
				});
			},
		],
		function (err) {
			if (err) {
				return callback(err);
			} else {
				return callback();
			}
		}
	);
};
