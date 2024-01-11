const DataTypes = require("sequelize").DataTypes;
const ormConnector = require("../config/connector.js");

const User = ormConnector.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        isEmail: {
          msg: "Invalid email address",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        isAlpha: {
          msg: "Only Alphabets allowed for Name",
        },
      },
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isPhoneNumber(value) {
          const phoneRegex = /^\d{10,15}$/;
          if (value && !phoneRegex.test(value)) {
            throw new Error("Invalid Phone Number Format");
          }
        },
      },
    },
  },
  {
    tableName: "users",
  },
);

User.sync();

module.exports = User;
