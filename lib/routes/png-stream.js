var client = require('./../drone');

var latestImage;

module.exports = {};

var startStream = (function() {
  var started = false;
  return function() {
    if (started) return;
    started = true;
    client.getPngStream()
      .on('error', console.log)
      .on('data', function(frame) {
        latestImage = frame;
      });
  };
})();

module.exports.get = function(req, res) {
  startStream();

  if (!latestImage) {
    res.status(500);
    res.end();
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  return res.end(latestImage, 'binary');
};
