const userRoutes = require("express").Router();
const { updateUserPage, updateUser } = require("../controllers/users");

userRoutes.get("/update-user", updateUserPage);
userRoutes.post("/update-user", updateUser);

module.exports = userRoutes;
