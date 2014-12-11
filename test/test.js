var chai = require('chai'),
  expect = chai.expect;

var dummyMessage = 'message';
var dummyConfig = {
  apiKey: '123'
};
var dummyRegistrationIds = ['123'];

describe('GCM Test', function() {
  var gcmTest;

  before(function() {
    gcmTest = require('../index');
  });

  it('should be define', function() {
    expect(gcmTest).to.not.be.undefined();
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

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig);
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

      gcmTest(dummyMessage, dummyRegistrationIds, dummyConfig);
    });
  });
});