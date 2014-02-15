var path        = require('path');

var express     = require('express');
var coffeeMid   = require('coffee-middleware');

var dronestream = require('dronestream');
var client      = require('./lib/drone');

var config      = require('./config/config');
var app         = express();
var routes      = require('./lib/routes/');

var port        = config.webServerPort || 3000;
var streamPort  = /*config.streamPort    ||*/ 3001; // hard coded, sorry
var publicDir   = path.join(__dirname, 'public');

dronestream.listen(streamPort, {tcpVideoStream: client.getVideoStream()});

app.configure(function() {
  app.use(coffeeMid({
    src: publicDir
  }));
  app.use(express.static(publicDir));
  app.use(express.json());
  app.use(express.urlencoded());
});

app.post('/voice-command', routes.voiceCommand.submit);

app.get('/vendor/dronestream.js', function(req, res) {
  res.sendfile(path.join(
    'node_modules', 'dronestream', 'dist', 'nodecopter-client.js'
  ));
});

app.get('/vendor/jquery.js', function(req, res) {
  res.sendfile(path.join(
    'node_modules', 'jquery', 'dist', 'jquery.min.js'
  ));
});

app.listen(port, function() {
  console.log('Web server is now listening on port: ' + port);
});
