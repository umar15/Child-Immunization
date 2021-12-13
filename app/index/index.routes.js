const indexControllers = require("./index.controller");

module.exports = (app, version) => {
	app.get(version + "/", indexControllers.indexFunction);
	app.get(version + "/errors", indexControllers.errorFunction);
};
