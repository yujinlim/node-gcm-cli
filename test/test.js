var chai = require('chai'),
  expect = chai.expect;

var noop = require('lodash.noop');

var dummyMessage = 'message';
var dummyConfig = {
  apiKey: '123',
  collapseKey: 'demo',
  delayWhileIdle: true,
  dryRun: true,
  timeToLive: 10
};
var dummyRegistrationIds = ['123'];

describe('GCM Test', function() {
  var gcmTest;

  before(function() {
    gcmTest = require('../index');
  });

  it('should be define', function() {
    expect(gcmTest).to.not.be.undefined;
  });
});

describe('validations', function() {
  var gcmTest = require('../index');

  it('should throw api key not available error', function() {
    expect(gcmTest).to.throw(/api key is not available/);
  });

  it('should throw message not available error', function() {
    expect(function(){
      return gcmTest(null, null, dummyConfig);
    }).to.throw(/message is not available/);
  });

  it('should throw registration ids is empty', function() {
    expect(function() {
      return gcmTest(dummyMessage, null, dummyConfig);
    }).to.throw(/no registration ids found/);
  });

  it('should expecting callback', function() {
    expect(function() {
      return gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig);
    }).to.throw(/expecting callback/);
  });
});

describe('properties on node gcm', function() {
  var proxyquire =  require('proxyquire'),
    nodeGcm = {};

  describe('check config data', function() {
    var gcmTest,
      apiKey = dummyConfig.apiKey;

    it('should be able to get api key', function() {
      nodeGcm = {
        Sender: function(x) {
          expect(x).to.equal(apiKey);
        }
      }

      gcmTest = proxyquire('../lib/gcmTest', {
        'gcm': nodeGcm
      });

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig, noop);
    });
  });

  describe('check extra options data', function() {
    it('expect correct flags on gcm', function() {
      nodeGcm = {
        Message: function(x) {
          expect(x.collapseKey).to.equal(dummyConfig.collapseKey);
          expect(x.delayWhileIdle).to.equal(dummyConfig.delayWhileIdle);
          expect(x.dryRun).to.equal(dummyConfig.dryRun);
          expect(x.timeToLive).to.equal(dummyConfig.timeToLive);
        }
      }

      gcmTest = proxyquire('../lib/gcmTest', {
        'gcm': nodeGcm
      });

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig, noop);
    });
  });

  describe('expecting callback to return', function() {
    it('should trigger callback', function(done) {
      gcmTest = proxyquire('../lib/gcmTest', {
        'gcm': nodeGcm
      });

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig, function(err, response) {
        expect(err);
        done();
      });
    });
  });

  describe('check gcm message data', function() {
    it('expect message object to be the same', function() {
      nodeGcm = {
        Message: function(x) {
          expect(x.data.message).to.equal(dummyMessage);
        }
      }

      gcmTest = proxyquire('../lib/gcmTest', {
        'gcm': nodeGcm
      });

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig, noop);
    });

    it('expect message to accept message as object', function() {
      var message = {
        message: 'value',
        path: 'path'
      };
      nodeGcm = {
        Message: function(x) {
          expect(x.data).to.deep.equal(message);
        }
      }

      gcmTest(message, dummyRegistrationIds, dummyConfig, noop);
    });
  });
});
