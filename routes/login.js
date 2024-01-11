const loginRoutes = require("express").Router();
const { loginUserPage, loginUser } = require("../controllers/login");
const { registerUserPage, registerUser } = require("../controllers/users");

loginRoutes.get("/login", loginUserPage);
loginRoutes.post("/login", loginUser);

loginRoutes.get("/register", registerUserPage);
loginRoutes.post("/register", registerUser);

module.exports = loginRoutes;
