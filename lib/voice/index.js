var client   = require('../drone');
var commands = require('./commands/');

module.exports = function(intent, entities) {

  commands[intent].call(client, entities);

};
