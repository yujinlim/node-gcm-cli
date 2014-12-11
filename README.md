Node GCM CLI [![Build Status](http://img.shields.io/travis/yujinlim/node-gcm-cli.svg?style=flat-square)](https://travis-ci.org/yujinlim/node-gcm-cli) [![Dependency Status](http://img.shields.io/gemnasium/yujinlim/node-gcm-cli.svg?style=flat-square)](https://gemnasium.com/yujinlim/node-gcm-cli) [![Coverage Status](http://img.shields.io/coveralls/yujinlim/node-gcm-cli.svg?style=flat-square)](https://coveralls.io/r/yujinlim/node-gcm-cli)
============

NodeJs CLI to test gcm on your android application

## Installation
```
$ npm install gcm-test
```
## Usage
```Javascript

var gcmTest = require('gcm-test');

gcmTest('hello world', ['123'], {
  apiKey: '123'
}, function(err, response){
  console.log(err, response);
});
```
## CLI
```
$ npm install -g gcm-test

$ gcm --help

  Usage: cli [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -m, --message <message>      message that you wish to send
    -k, --key <key>              google api key
    -r, --registrationids <ids>  registrationids, if more than one
```
