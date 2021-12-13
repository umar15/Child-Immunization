let indexFunction = async (req, res, next) => {
	res.json({
		status: 1,
		message: "CVS server is running",
		data: {},
	});
};

let errorFunction = async (req, res, next) => {
	res.json({
		status: 1,
		message: "SOmething went wrong on server side.",
		data: {},
	});
};

module.exports = {
	indexFunction,
	errorFunction,
};
