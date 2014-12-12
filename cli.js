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
  .option('-m, --message <message>', 'message that you wish to send')
  .option('-k, --key <key>', 'google api key')
  .option('-r, --registrationids <ids>', 'comma separated ids, if more than one', list)
  .option('-j, --json', 'message is json string', false);

program.parse(process.argv);

if (program.message && program.key && program.registrationids) {
  if (program.json)
    program.message = toObject(program.message);

  gcm(program.message, program.registrationids, {
    apiKey: program.key
  }, function(err, response){
    console.log(err, response);
  });
}