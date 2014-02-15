var config   = require('../config/config');

var arDrone  = require('ar-drone');
var client   = arDrone.createClient({ ip: (config.droneIp || '192.168.1.1') });

module.exports = client;
