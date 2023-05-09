const express = require("express");
const router = express.Router();
router.get("/", function (req, res) {
  res.send("this is home page");
});
router.get("/add-products", (req, res) => {
  res.send(
    '<form method="POST" action="/products"><input name="product" type="text"/><button type="submit">add</button></form>'
  );
});
router.post("/products", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
