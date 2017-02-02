var express = require('express');
var path = require('path');
var app = express();

app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use('/', express.static(path.join(__dirname, '/')));

app.get('/index2', function (req, res) {
  res.sendFile(path.join(__dirname, '/index2.html'));
})

app.get('/', function (req, res) {
  res.redirect('/index2');
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})