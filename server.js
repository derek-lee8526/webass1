const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const route = require('./route');
let app = express();
const expressHbs = require('express-handlebars');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views')
app.use(express.static('public'));



app.get('/',  (req,res) => {
    res.render('index');
})

app.get('/summary', (req,res) => {
    res.render('summary')
})

app.get('/leaderboard', (req,res) => {
    res.render('leaderboard')
})

app.use(route);

app.listen(3000);
console.log("server start")
