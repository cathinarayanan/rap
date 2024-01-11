const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

// todo refractor pwd to not be here
const generateAccessToken = (userId, pwd) => {
  console.log(userId);
  const signedToken = jwt.sign({ user: userId, pwd }, secret, {
    expiresIn: "1800s",
  });

  return signedToken;
};

const idFromTokenPayload = (token) => {
  // Decode the token
  const decoded = jwt.decode(token, { complete: true });
  // Access the payload
  const payload = decoded.payload;
  return payload.user;
};

const findTokenInCookie = async (req) => {
  const token = await req.cookies["authorization"];
  if (!token) {
    throw new Error("Access Denied - NO Token");
  } else {
    return token;
  }
};

const findVerifiedUser = async (token) => {
  const verifiedUser = await jwt.verify(token, secret); // env.SECRET => which is the seceret key for jwt
  if (!verifiedUser) {
    throw new Error("Access Denied - jwt verification failed");
  } else {
    const user = idFromTokenPayload(token);
    return user;
  }
};

module.exports = { generateAccessToken, findTokenInCookie, findVerifiedUser };
