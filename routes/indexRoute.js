const indexRoute = require("express").Router();
const { indexPage } = require("../controllers/indexController");

indexRoute.get("/", indexPage);

module.exports = indexRoute;
