const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_complete', 'root', 'India@123', { dialect: 'mysql', host: 'localhost' });
module.exports = sequelize;