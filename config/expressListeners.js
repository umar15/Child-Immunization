const chalk = require("chalk"),
	winston = require("./winston");

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}
	var bind = "3000";
	// const bind = typeof port === "string" ? "Pipe" + global.config.PORT : "Port" + global.config.PORT;

	// handle specific listen errors with friendly messages
	switch (error) {
		case "EACCES":
			winston.info(bind + " requires elevated privilages");
			process.exit(1);
			break;
		case "EADDRINUSE":
			winston.info(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	const addr = global.server.address();
	const bind = typeof addr === "string" ? "pipe" + addr : "port " + addr.port;
	winston.info(chalk.bold.green("Server is listening on ", bind));
}

module.exports = {
	onError,
	onListening,
};
