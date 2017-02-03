var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var options = {
  cert: fs.readFileSync('client-cert.pem'),
  key: fs.readFileSync('client-key.pem')
};

app.use('/bower_components', express.static(path.join(__dirname, '/../client/bower_components')));
app.use('/scripts', express.static(path.join(__dirname, '/../client/scripts')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
})

var server = https.createServer(options, app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})