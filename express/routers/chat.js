const express = require("express");
const router = express.Router();
const fs = require("fs");

// const LocalStorage = require("node-localstorage").LocalStorage,
//   localStorage = new LocalStorage("./scratch");
router.get("/login", (req, res) => {
  res.send(
    `<form method="POST" action="/login"><input name="username" type="text"/><button type="submit">add</button></form>`
  );
});
router.post("/login", (req, res) => {
  //   console.log(req.body.username);
  //   localStorage.setItem("myFirstKey", "myFirstValue");
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
 
  res.send(
    `<form method="POST" action="/sendmessage"><input name="message" type="text"/><button type="submit">send</button></form>`
  );
});
router.post("/sendmessage", (req, res) => {
  fs.writeFileSync("message.txt", req.body.message);
});
module.exports = router;
