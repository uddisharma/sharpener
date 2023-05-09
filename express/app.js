const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.get(
//   "/",
//   (req, res, next) => {
//     console.log("this is middleware");
//     next();
//   },
//   (req, res) => {
//     res.send(
//       `<div><h1>this is home page after using the middleware</h1></div>`
//     );
//   }
// );
// app.use('/middleware', (req, res, next) =>{
//     console.log("middleware start")
    
//     next()
// })
// app.get('/middleware', (req, res, next) => {
//     console.log("main funtion")
//     next()
// })   
// app.use('/middleware', (req, res, next) => {
//     console.log("end of main funtion with middleware")
//     res.send('this is middleware page with middleware') 
// });
app.use('/add-products',(req,res,next)=>{
    res.send('<form method="POST" action="/products"><input name="product" type="text"/><button type="submit">add</button></form')
})
app.use('/products', (req,res)=>{
    console.log(req.body)
    res.redirect('/')
})
app.use('/',(req,res)=>{
    res.send('this is home page')
})
app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
