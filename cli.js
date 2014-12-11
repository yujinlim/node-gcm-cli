#!/usr/bin/env node

var program = require('commander'),
  gcm = require('./lib/gcmTest');

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .option('-m, --message <message>', 'message that you wish to send')
  .option('-k,--key <key>', 'google api key')
  .option('-r, --registrationids <ids>', 'registrationids, if more than one', list);

program.parse(process.argv);

if (program.message && program.key && program.registrationids) {
  gcm(program.message, program.registrationids, {
    apiKey: program.key
  }, function(err, response){
    console.log(err, response);
  });
} 