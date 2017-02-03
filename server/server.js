var express = require('express');
var path = require('path');
var https = require('https');
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

server.listen(3000, function () {
  console.log('Server listening on port 3000!')
})