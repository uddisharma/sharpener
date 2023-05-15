// const mysql = require('mysql2');
// const pool=mysql.createPool({
// host:"localhost",
// user:"root",
// database:"new_schema",
// password:"Deepak@123"
// })
// module.exports= pool.promise();

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('new_schema', 'root', 'Deepak@123', {
//     dialect: "mysql",
//     host: "localhost"
// })
// module.exports= sequelize;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'new_schema',
 'root',
 'Deepak@123',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
module.exports= sequelize;