const logoutRoute = require("express").Router();
const { logoutUser } = require("../controllers/logout");

logoutRoute.get("/logout", logoutUser);

module.exports = logoutRoute;
