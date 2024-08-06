const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete','168179' ,{
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
