#!/usr/bin/env node

var version = require('./package.json').version;
var program = require('commander'),
  gcm = require('./lib/gcmTest');

function list(val) {
  return val.split(',');
}

function toObject(val) {
  keyvalues = val.split(',');
  var message = {};
  keyvalues.forEach(function(v) {
    var values = v.split(':');
    message[values[0]] = values[1];
  });
  return message;
}

program
  .version(version)
  .option('-m, --message <message>', 'message that you wish to send (string or key-value), eg: --message="message:this is test,path:landing"')
  .option('-k, --apiKey <key>', 'google api key')
  .option('-r, --registrationids <ids>', 'comma separated ids, if more than one', list)
  .option('-j, --json', 'message is json string (default to false)', false)
  .option('-c, --collapseKey <key>', 'collapse key for android')
  .option('-d, --delayWhileIdle', '`If the device is connected but idle, the message will still be delivered right away unless the delayWhileIdle flag is set to true`, (default to false)', false)
  .option('-t, --timeToLive <time>', 'alive time of this notification')
  .option('-D, --dryRun', 'for debug/ test purpose, it allows for sending a message without really sending it (default to false)', false);

program.parse(process.argv);

if (program.message && program.apiKey && program.registrationids) {
  if (program.json)
    program.message = toObject(program.message);
  gcm(program.message, program.registrationids, program, function(err, response){
    console.log(err, response);
  });
}