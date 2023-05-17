const mysql = require('mysql2');
const pool=mysql.createPool({
host:"localhost",
user:"root",
database:"booking_app",
password:"Deepak@123"
})
module.exports= pool.promise();