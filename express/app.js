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
const MyModel = require('./modals/product.js')
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", newpath);
hbs.registerPartials(partials);
app.use(express.static(staticpath));
app.get("/", (req, res) => {
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // message = data;
    // console.log(data)
    res.render("index", {
      message: data,
    });
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contactus", (req, res) => {
  res.render("contactus");
});
app.post("/send", (req, res) => {
  localStorage.setItem("username", req.body.username);
  res.redirect("/success");
});
app.get("/success", (req, res) => {
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.render("success", {
      message: data,
    });
  });
});
app.post("/sendmessage", (req, res) => {
  const username = localStorage.getItem("username");
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFileSync("message.txt", data + username + req.body.message);
    res.redirect("/");
  });
});
app.get("*", (req, res) => {
  res.render("404");
});
// app.use('/',ChatRoute )
app.post('/items', (req, res) => {
  const newItem = req.body;
  const createdItem = MyModel.create(newItem);
  res.status(201).json(createdItem);
  });
app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
