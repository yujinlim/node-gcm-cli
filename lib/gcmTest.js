var gcm = require('node-gcm'),
  isString = require('lodash.isstring'),
  isEmpty = require('lodash.isempty');

module.exports = function(message, registrationIds, config, cb) {
  if (!config || !config.apiKey)
    throw new Error('api key is not available');

  if (!message)
    throw new Error('message is not available');

  if (isEmpty(registrationIds))
    throw new Error('no registration ids found');

  if (!cb)
    throw new Error('expecting callback');

  // check if message is string
  if (isString(message)) {
    message = {
      message: message
    }
  }

  var gcmSender = new gcm.Sender(config.apiKey);
  
  var gcmMessage = new gcm.Message({
    collapseKey: config.collapseKey,
    delayWhileIdle: config.delayWhileIdle,
    dryRun: config.dryRun,
    timeToLive: config.timeToLive,
    data: message
  });

  gcmSender.sendNoRetry(gcmMessage, registrationIds, function(err, response) {
    cb(err, response);
  });
}
