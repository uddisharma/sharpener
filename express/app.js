const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const app = express();
const ChatRoute = require("./routers/chat.js");
const staticpath = path.join(__dirname, "../public");
const newpath = path.join(__dirname, "./templates/views");
const partials = path.join(__dirname, "./templates/partials");
const MyModel = require("./modals/product.js");
const cartModel = require("./modals/product.js");
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const db = require('./database.js')
const Booking = require('./controllers/products.js')
const User= require('./modals/user.js')
const Product= require('./modals/newproducts.js')
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", newpath);
hbs.registerPartials(partials);
app.use(express.static(staticpath));
User.hasOne(Product)
User.hasMany(Product);
User.belongsTo(Product)
app.get('/data', (req, ros) => {
  Booking.getAll()
    .then((res) => {
      ros.send({ data: res[0] })
    })
    .catch((err) => {
      console.log(err)
    })
})
app.use('/book', (req, res) => {
  res.render('senddata')
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
