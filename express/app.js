
const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const hbs= require('hbs');
const app = express();

const staticpath = path.join(__dirname, '../public');
const newpath=path.join(__dirname,'./templates/views');
const partials=path.join(__dirname,'./templates/partials');
app.set('view engine', 'hbs');
app.set('views', newpath)
hbs.registerPartials(partials)
// app.use(express.static(staticpath))
app.get('/',(rq,res)=>{
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contactus', (req, res) => {
    res.render('contactus');
})
app.post('/send',(req,res)=>{
res.redirect('/success');
})
app.get('/success', (req, res) => {
  res.render('success');
})
app.get('*', (req, res) => {
    res.render('404');
})
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, (req, res) => {
  console.log("Listening on port", 3000);
});
