Node GCM CLI [![Build Status](https://travis-ci.org/yujinlim/node-gcm-cli.svg)](https://travis-ci.org/yujinlim/node-gcm-cli)
============

NodeJs CLI to test gcm on your android application

## Installation
```
npm install gcm-test
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
npm install -g gcm-test

gcm --help
```
