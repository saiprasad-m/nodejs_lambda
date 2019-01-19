const Sequelize = require('sequelize');
module.exports = new Sequelize('d2a0i6uuev19di', 'apxlwbdjvbvdag', '8c17069b34b7f46493be895d296b325a62aa8200bffa0f8efa32227731073e52', {
    host: 'ec2-107-20-211-10.compute-1.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: false,
    ssl: true,
    dialectOptions: {
        ssl: true
    }, 
    pool: {
        max: 5,
        min: 0,
        acquire: 90000,
        idle: 40000
    }
})
