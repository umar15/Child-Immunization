const multer = require("multer");

let permits = () => {
	return multer({
		storage: multer.diskStorage({
			destination: (req, file, callback) => {
				callback(null, __dirname + "/../public/permits");
			},
			filename: (req, file, callback) => {
				let fileName = Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
				callback(null, fileName);
			},
		}),
		fileFilter: (req, file, callback) => {
			if (file) {
				// file type check
				callback(null, true);
			} else {
				// callback(null, false);
				return callback(new Error("Allowed only .docx and .pdf files."));
			}
		},
	});
};

module.exports = { permits };
