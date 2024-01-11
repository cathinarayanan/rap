const { findTokenInCookie, findVerifiedUser } = require("../util/tokenService");

const verifyIfAuthorized = (req, res, next) => {
  const tokenPromise = findTokenInCookie(req);
  tokenPromise
    .then((token) => {
      console.log(token);
      const TOKEN = token;
      const findUserPromise = findVerifiedUser(TOKEN);
      findUserPromise
        .then((data) => {
          console.log(data);
          const user = data;
          req.user = user;
          next();
        })
        .catch((error) => {
          console.log("JWT verification failed");
          return res.status(401).send(error.message);
        });
    })
    .catch((error) => {
      console.log("No Token");
      return res.status(401).send(error.message);
    });
};

module.exports = { verifyIfAuthorized };
