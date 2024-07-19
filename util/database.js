const mysql = require('mysql');
const pool = mysql.createPool({
      host:'localhost',
      user:'root',
      database:'node-complete',
      password:168179
})

module.exports = pool.promise();