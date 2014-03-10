var config = require('./../../config');

module.exports = function(entities) {

  this.up(0.5);
  if (config.safeMode) {
    this.after(config.safeTime, this.stop);
  }

};
