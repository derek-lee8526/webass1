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
      layoutsDir: 'views/',
      defaultLayout: 'summary',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views')
app.use(express.static('public'));

app.use(route);

app.get('/',  (req,res) => {
    res.sendFile(__dirname + '/' + 'index.html');
})


app.listen(3000);
console.log("server start")
