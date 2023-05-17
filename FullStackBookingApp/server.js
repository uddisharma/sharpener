const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000; 
const appointmentRoutes = require('./routes/appointments.js');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/appointments', appointmentRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
