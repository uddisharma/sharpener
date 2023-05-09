const express = require("express");
const app = express();
app.get(
  "/",
  (req, res, next) => {
    console.log("this is middleware");
    next();
  },
  (req, res) => {
    res.send(
      `<div><h1>this is home page after using the middleware</h1></div>`
    );
  }
);
app.use('/middleware', (req, res, next) =>{
    console.log("middleware start")
    
    next()
})
app.get('/middleware', (req, res, next) => {
    console.log("main funtion")
    next()
})   
app.use('/middleware', (req, res, next) => {
    console.log("end of main funtion with middleware")
    res.send('this is middleware page with middleware') 
});
app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
