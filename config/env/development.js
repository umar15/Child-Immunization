const METHOD = "http",
	IP = "192.168.43.178",
	PORT = process.env.PORT || 3001,
	DB_USER = process.env.DB_USER || "umarAdmin",
	DB_PASS = process.env.DB_PSWRD || "err0rn0tf0und",
	ATLAS = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.c4buh.mongodb.net/CVS?retryWrites=true&w=majority`,
	HOST = "mongodb://localhost:27017/lms",
	URL = METHOD + "://" + IP,
	URI = URL + ":" + PORT;

module.exports = {
	METHOD: METHOD,
	IP: IP,
	PORT: PORT,
	mongodb: {
		host: ATLAS,
		credentials: {
			username: DB_USER,
			password: DB_PASS,
		},
	},
	enableMongoDebugging: true,
	session: {
		secret: "SCM",
	},
	URL: URL,
	URI: URI,
};
