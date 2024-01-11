const express = require("express");
const bodyParser = require('body-parser');
const cookie = require("cookie-parser");
const indexRoute = require("./routes/indexRoute.js");
const loginRoutes = require("./routes/login.js");
const homeRoute = require("./routes/home.js");
const logoutRoute = require("./routes/logout.js");
const userRoutes = require("./routes/users.js");
const { verifyIfAuthorized } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());

app.use("/", indexRoute);
app.use("/", loginRoutes);
app.use("/", homeRoute);

//  middleware function
app.use(verifyIfAuthorized);
app.use("/", userRoutes);
app.use("/", logoutRoute);

app.listen(port, () => {
  console.log(`app running on http://127.0.0.1:${port}`);
});
