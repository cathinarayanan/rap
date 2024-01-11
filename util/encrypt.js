const bcrypt = require("bcrypt");
const saltRounds = 10; // Salt rounds for hashing (recommended value)

// Function to hash a password
const hashPassword = (plainPassword) => {
  const hashedPasswordPromise = bcrypt.hash(plainPassword, saltRounds);
  return hashedPasswordPromise
    .then((pwd) => {
      return pwd;
    })
    .catch((error) => {
      console.error("hashing failed: ", error);
    });
};

// Function to compare a password with its hash
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match; // Returns true or false
  } catch (error) {
    throw new Error("Comparison failed");
  }
};

module.exports = { comparePassword, hashPassword };
