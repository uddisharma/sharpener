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
  const db= require('./utils/database.js')
  const Products = require('./controllers/products.js')
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", newpath);
hbs.registerPartials(partials);
app.use(express.static(staticpath));
// db.execute("SELECT * FROM PRODUCTS")
// .then((data)=>{
//   console.log(data[0])
// })
// .catch((err)=>{
//   console.log(err)
// })
// Products.getAll()
// .then((res)=>{
//   console.log('res', res[0])

// })
// .catch((err)=>{
//   console.log(err)
// })
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
app.post("/items", (req, res) => {
  const newItem = req.body;
  const createdItem = MyModel.create(newItem);
  res.status(201).json(createdItem);
});
app.get("/items", (req, res) => {
  const data = MyModel.find();
  if (data) {
    res.send({ data: data });
  } else {
    res.send({ message: "no data found" });
  }
});


app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const data = MyModel.findById({ id: id });
  if (data) {
    res.send({ data: data });
  } else {
    res.send({ message: "no data found" });
  }
});
app.get("/items", (req, res) => {
  const { sort, limit } = req.params;
  const data = MyModel.find().limit(limit).sort(sort).exec;
  if (data) {
    res.send({ data: data });
  } else {
    res.send({ message: "no data found" });
  }
});
app.delete("/items/:id", (req,res)=>{
  const id=req.params.id;
    MyModel.findByIdAndDelete({ id: id})
    .then((data)=>{
      res.send("item is deleted successfully")
    }).catch((err)=>{
      res.send('something went wrong')
    })
})
app.post("/cart/add", (req, res) => {
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity) {
    res.status(400).send("Missing required parameters");
  }

  if (!cart[itemId]) {
    cart[itemId] = quantity;
  } else {
    cart[itemId] += quantity;
  }

  res.send(`Item ${itemId} added to cart`);
});
app.get("/cart", (req, res) => {
  const data = cartModel.find();
  if (data) {
    res.send({ data: data });
  } else {
    res.send({ message: "no data found" });
  }
});
app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
