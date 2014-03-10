var config = require('./../../config');

module.exports = function(entities) {

  this.left(0.2);
  if (config.safeMode) {
    this.after(config.safeTime, this.stop);
  }

};
