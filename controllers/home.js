const path = require("path");

const homePage = (req, res) => {
  const homePath = path.join(__dirname, "../views/home.html");
  res.sendFile(homePath);
};

module.exports = { homePage };
