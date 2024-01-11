const path = require("path");
const { comparePassword } = require("../util/encrypt");
const User = require("../dao/user");
const { generateAccessToken } = require("../util/tokenService");

const loginUserPage = (req, res) => {
  const loginPath = path.join(__dirname, "../views/login.html");
  res.sendFile(loginPath);
}

const loginUser = (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.pwd;

  if (!(userEmail && password)) {
    return res.status(500).send("Email / Password cannot be empty");
  }

  const userDataPromise = User.findOne({
    where: {
      email: userEmail,
    },
  });

  userDataPromise
    .then((data) => {
      console.log(data);

      const isMatching = comparePassword(password, data.pwd);

      isMatching.then((isIt) => {
        if (isIt) {
          const generatedjwttoken = generateAccessToken(data.email);
          // setting maxAge to 1800 sec (30 mins)
          res.cookie("authorization", generatedjwttoken, {
            maxAge: 1800 * 1000,
            httpOnly: true,
          }); // setting "authorization" in cookies
          const responseData = {
            email: data.email,
            token: generatedjwttoken,
          };
          console.log("Logged IN successfully.. ", responseData);
          // res.status(200).send(responseData);
          res.redirect("/home");
        } else {
          res.status(401).send("pwd not matching");
        }
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Invalid mail id");
    });
};

module.exports = { loginUserPage, loginUser };
