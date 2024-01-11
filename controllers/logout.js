const logoutUser = (req, res) => {
  res.clearCookie("authorization");
  console.log("User Logged Out!");
  // res.status(201).send("User Logged Out!");
  res.redirect("/");
};

module.exports = { logoutUser };
