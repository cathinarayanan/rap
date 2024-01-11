const homeRoute = require("express").Router();
const { homePage } = require("../controllers/home");

homeRoute.get("/home", homePage);

module.exports = homeRoute;
