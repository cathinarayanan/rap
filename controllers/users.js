const path = require("path");
const User = require("../dao/user");
const { hashPassword } = require("../util/encrypt");
const { updateUserFn } = require("../services/users");

const registerUserPage = (req, res) => {
  const registerPath = path.join(__dirname, "../views/register.html");
  res.sendFile(registerPath);
}

const registerUser = (req, res) => {
  const userId = req.body.email;
  const userName = req.body.name;
  const phoneNo = req.body.phone;

  const pwd = req.body.pwd;
  const hashedPwdPromise = hashPassword(pwd);

  hashedPwdPromise.then((hashedPwd) => {
    const userData = {
      email: userId,
      name: userName,
      pwd: hashedPwd,
      phone: phoneNo,
    };

    const createUserPromise = User.create(userData);

    createUserPromise
      .then((data) => {
        console.log("User added successfully.. ", userData);
        // res.status(201).json({ message: "User added successfully", userData });
        res.redirect("/login");
      })
      .catch((error) => {
        console.error("error", error);
        res.status(500).json({ message: error.message });
      });
  });
};

const updateUserPage = (req, res) => {
  const updateUserPath = path.join(__dirname, "../views/updateUser.html");
  res.sendFile(updateUserPath);
}

const updateUser = (req, res) => {
  const userId = req.body.email;
  const userName = req.body.name;
  const phoneNo = req.body.phone;

  const pwd = req.body.pwd;

  const updatedFields = {};

  if (userId) {
    updatedFields.email = userId;
  }
  if (userName) {
    updatedFields.name = userName;
  }
  if (phoneNo) {
    updatedFields.phone = phoneNo;
  }
  if (pwd) {
    const hashedPwdPromise = hashPassword(pwd);
    hashedPwdPromise.then((hashedPwd) => {
      updatedFields.pwd = hashedPwd;

      updateUserFn(req.user, updatedFields, res);
    });
  } else {
    updateUserFn(req.user, updatedFields, res);
  }
};

module.exports = { registerUserPage, registerUser, updateUserPage, updateUser };
