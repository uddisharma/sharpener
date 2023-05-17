const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require('./database.js')
// app.use(bodyParser.json({ extended: false }));
app.get('/data', (req, ros) => {
    db.execute('SELECT * FROM booking')
    .then((res) => {
      ros.send({ data: res[0] })
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post('/postdata', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var phone = req.body.phone

  db.execute(`INSERT INTO booking (name, email, phone)VALUES ("${name}", "${email}", "${phone}")`
  ).then((result) => {
    res.send('booking is done')
  })
    .catch((err) => {
      console.log(err)
    })
})
app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
