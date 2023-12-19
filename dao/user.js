const DataTypes  = require('sequelize').DataTypes;
const ormConnector = require('./connector.js');

const User = ormConnector.define('User', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'users'
    });

User.sync();

module.exports =  User;
