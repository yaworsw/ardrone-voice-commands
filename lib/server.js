var path      = require('path');

var express   = require('express');
var coffeeMid = require('coffee-middleware');

var config    = require('../config/config');
var app       = express();
var routes    = require('./routes/');

var port      = config.webServerPort || 3000;
var publicDir = path.join(__dirname, '..', 'public');

app.configure(function() {
  app.use(coffeeMid({
    src: publicDir
  }));
  app.use(express.static(publicDir));
  app.use(express.bodyParser());
});

app.post('/voice-command', routes.voiceCommand.submit);

app.listen(port, function() {
  console.log('Web server is now listening on port: ' + port);
});
