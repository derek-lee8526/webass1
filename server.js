const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const route = require('./index');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


app.use(express.static('public'));
// app.use(route)

app.get('/',  (req,res) => {
    res.sendFile(__dirname + '/' + 'index.html');
})


app.listen(3000);
console.log("server start")
