const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000; // or any other port number you prefer
const expenseRoutes = require("./routes/expenses.js");

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_username",
  password: "your_mysql_password",
  database: "your_database_name",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

// Set up the Express app
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/expenses", expenseRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
