const userController = require("./user.controller");
const passport = require("../../config/passport");
const multer = require("../../config/multer").permits();

module.exports = (app, version) => {
	app.delete(version + "/users/logout", passport.isAuthenticated, userController.logout);
	app.post(version + "/users/create", multer.single("permit"), userController.createUser);
	app.get(version + "/users", userController.getUsers);
	app.put(version + "/users/:id", passport.isAuthenticated, userController.updateUser);
	app.delete(version + "/users/:id", passport.isAuthenticated, userController.deleteUser);
	app.post(version + "/users/login", userController.logInUser, userController.sendSignInSuccess);
	app.get(version + "/users/current", passport.isAuthenticated, userController.sendCurrentUser);
};
