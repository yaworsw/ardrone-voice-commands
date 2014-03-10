var config = require('./../../config');

module.exports = function(entities) {

  this.counterClockwise(0.5);
  if (config.safeMode) {
    this.after(config.safeTime, this.stop);
  }

};
