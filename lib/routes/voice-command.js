var voiceCommand = {};
module.exports   = voiceCommand;

var commands     = require('../voice/');

voiceCommand.submit = function(req, res) {

  res.end('ok');

  var intent   = req.body.intent;
  var entities = req.body.entities;

  commands(intent, entities);

};
