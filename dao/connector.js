const Sequelize = require('sequelize');

const ormConnector = new Sequelize('rap', 'avnadmin', 'AVNS_uCvawkCzv-2BdJ-C-Dy',
    {
        logging: console.log,
        port: 19662,
        host: 'mysql2d189f6e-chandrasekhar.a.aivencloud.com',
        dialect: 'mysql',
        ssl: true
    });


module.exports =  ormConnector ;