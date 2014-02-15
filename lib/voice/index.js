var config    = require('../../config/config');

var arDrone  = require('ar-drone');
var client   = arDrone.createClient({ ip: (config.droneIp || '192.168.1.1') });
var commands = require('./commands/');

module.exports = function(intent, entities) {

  commands[intent](client, entities);

};
