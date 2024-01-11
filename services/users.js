const User = require("../dao/user");

const updateUserFn = (userEmail, updatedFields, res) => {
  const rowsUpdatedPromise = User.update(updatedFields, {
    where: {
      email: userEmail,
    },
  });
  rowsUpdatedPromise
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 1) {
        if (updatedFields.email && userEmail != updatedFields.email) {
          res.clearCookie("authorization");
          console.log(`User with id ${userEmail} updated successfully!!`);
          console.log(`User ${userEmail} Logged OUT!`);
          return res.redirect("/login");
        }
        // return res
        //   .status(200)
        //   .send(`User with id ${userEmail} updated successfully!!`);
        console.log(`User with id ${userEmail} updated successfully!!`);
        return res.redirect("/home");
      } else {
        return res
          .status(400)
          .send(`XX User with id ${userEmail} update is unsuccessful XX`);
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.message });
    });
};

module.exports = { updateUserFn };
