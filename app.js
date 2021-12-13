const express = require("express"),
	path = require("path"),
	glob = require("glob"),
	http = require("http"),
	logger = require("morgan"),
	cors = require("cors"),
	cookieParser = require("cookie-parser"),
	helmet = require("helmet"),
	session = require("express-session"),
	mongoStore = require("connect-mongo"),
	expressListeners = require("./config/expressListeners"),
	winston = require("./config/winston"),
	schedular = require("./config/schedular"),
	dotenv = require("dotenv"),
	app = express();

winston.info(".env files are loading...");
glob.sync(".env*").forEach(function (file) {
	dotenv.config({ path: path.join(__dirname, file) });
	winston.info(file + " is loaded");
});

// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

// cors
let corsOptionsDelegate = (req, callback) => {
	let corsOptions;
	let allowedOrigins = ["http://localhost:" + (process.env.PORT || 3001)];
	if (allowedOrigins.indexOf(req.header("Origin")) !== -1) {
		corsOptions = {
			credentials: true,
			origin: true,
		};
	} else {
		corsOptions = {
			origin: false,
		};
	}
	callback(null, corsOptions);
};

// parse application/json
app.use(express.json());
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

logger.token("remote-user", (req, res) => {
	if (req.user) {
		if (req.user.uid) {
			return "{userId:" + req.user._id + "&name:" + req.user.name + "}";
		}
	} else {
		return "Guest";
	}
});
0;
logger.token("clientIP", (req, res) => {
	var clientIP = (req.headers["x-forwarded-for"] || "").split(",")[0] || req.connection.remoteAddress;

	return clientIP;
});

app.use(
	logger(
		":date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"
	)
);

// database connection and server starting
require("./config/mongooseConnection")((err) => {
	if (err) {
		winston.error(err);
	} else {
		// Serve static assets if in production
		if (process.env.NODE_ENV === "production") {
			// Set static folder
			app.use(express.static("client/build"));

			app.get("*", (req, res) => {
				res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
			});
		}

		global.server = http.createServer(app);
		global.server.listen(global.config.PORT);
		// global.server.listen("3000");
		global.server.on("error", expressListeners.onError);
		global.server.on("listening", expressListeners.onListening);

		// app.use(cors(corsOptionsDelegate));
		app.use(
			cors({
				origin: [
					"http://127.0.0.1:3000",
					"http://localhost:3000",
					"http://127.0.0.1:3001",
					"http://localhost:3001",
					"http://192.168.0.108",
					"http://192.168.0.108",
					"http://192.168.0.103",
					"http://192.168.0.104",
					"http://192.168.0.113",
					"http://192.168.0.115",
				],
				credentials: true,
			})
		);
		app.use(helmet());
		app.use(cookieParser());

		app.use(
			session({
				secret: global.config.session.secret,
				store: mongoStore.create({
					mongoUrl: config.mongodb.host,
					touchAfter: 14 * 24 * 60 * 60, // time period in seconds,
					mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
				}),
				resave: true,
				saveUninitialized: true,
				clearExpired: true,
				checkExpirationInterval: 900000,
				cookie: {
					maxAge: 60 * 24 * 3600 * 1000,
					sameSite: false,
				},
			})
		);

		var passport = require("./config/passport");
		app.use(passport.initialize());
		app.use(passport.session());

		global.errors = require("./config/errors");

		// Routes
		let userRoutes = "app/**/*.routes.js";
		glob.sync(userRoutes).forEach((file) => {
			require("./" + file)(app, "");
		});
		winston.info("Routes are loaded in system.");

		// Load error if it has message code
		app.use(async (err, req, res, next) => {
			winston.error(err);
			if (err) {
				let errorCode = err.msgCode;
				res.status(err.status || 500);
				return res.json({
					success: 0,
					message: err.message ? err.message : err.msg ? err.msg : global.errors[errorCode],
					response: 200,
					data: {},
				});
			} else {
				res.status(err.status || 500);
				return res.json({
					success: 0,
					message: "Something went wrong on server Side",
					response: 200,
					data: {},
				});
			}
		});

		// catch 404 and forward to error handler
		app.use((req, res, next) => {
			var err = new Error("Not Found");
			err.status = 404;
			next(err);
		});

		// schedular.start();
	}
});
