const express = require("express");
const router = express.Router();
const fs = require("fs");

const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/login"><input name="username" type="text"/><button type="submit">add</button></form>`
  );
});
router.post("/login", (req, res) => {
  //   console.log(req.body.username);
  localStorage.setItem("username", req.body.username);
  res.redirect("/");
});
router.get("/", (req, res) => {
  let message;
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    message = data;
  });
console.log(message);
  res.send(
    `<form method="POST" action="/sendmessage"><input name="message" type="text"/><button type="submit">send</button></form>`
  );
});
router.post("/sendmessage", (req, res) => {
  // const username = localStorage.getItem("username");
  console.log(req.body);
  fs.writeFileSync("message.txt", req.body.message);
});
module.exports = router;
