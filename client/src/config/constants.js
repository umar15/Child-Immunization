const PROTOCOL = "http",
	IP = "localhost",
	PORT = process.env.PORT || 3000,
	BE_PORT = process.env.BE_PORT || 3001,
	baseURL = PROTOCOL + "://" + IP,
	URL = baseURL + ":" + PORT;

export { PROTOCOL, IP, PORT, BE_PORT, baseURL, URL };
