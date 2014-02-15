var fs   = require('fs');
var path = require('path');

module.exports = {};

fs.readdirSync(__dirname).filter(function(file) {
  return file !== 'index.js';
}).forEach(function(file) {
  var moduleName  = file.replace(/\.(js|coffee)$/, '');
  var commandName = moduleName.replace(/-/g, '_');
  var modulePath  = path.join(__dirname, moduleName);
  module.exports[commandName] = require(modulePath);
});
