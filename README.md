Node GCM CLI [![Build Status](http://img.shields.io/travis/yujinlim/node-gcm-cli.svg?style=flat-square)](https://travis-ci.org/yujinlim/node-gcm-cli) [![Dependency Status](http://img.shields.io/gemnasium/yujinlim/node-gcm-cli.svg?style=flat-square)](https://gemnasium.com/yujinlim/node-gcm-cli) [![Coverage Status](https://coveralls.io/repos/yujinlim/node-gcm-cli/badge.png)](https://coveralls.io/r/yujinlim/node-gcm-cli)
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

// send data as an object
gcmTest({
  message: 'hello world',
  path: 'landing'
}, ['123'], {
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
    -m, --message <message>      message that you wish to send (string or key-value), eg: --message="message:this is test,path:landing"
    -k, --key <key>              google api key
    -r, --registrationids <ids>  comma separated ids, if more than one
    -j, --json                   message is json string (boolean), default to false
```

## Todos
- [ ] allows to pass other flags for gcm

## License
The MIT License (MIT)

Copyright (c) 2014 yujinlim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
