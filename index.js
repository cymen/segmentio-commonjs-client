// polyfills
require('Base64');
require('es6-promise');
require('whatwg-fetch');

var NAME = 'segmentio-commonjs-client';
var API_BASE_URL = 'https://api.segment.io/v1';

var Client = function(key) {
  this.key = btoa(key + ':');
  this.loggingOnly = false;
}

function headers(key) {
  return {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + key,
    'Content-Type': 'application/json'
  };
}

Client.prototype.setLoggingOnly = function() {
  this.loggingOnly = true;
};

Client.prototype.identify = function(body) {
  var url = API_BASE_URL + '/identify';
  var requestBody = {
    method: 'POST',
    headers: headers(this.key),
    body: JSON.stringify({
      type: 'identify',
      anonymousId: '' + body.anonymousId,
      userId: '' + body.userId,
      traits: body.traits || {}
    })
  };

  if (!this.loggingOnly) {
    fetch(url, requestBody);
  } else {
    if (console && console.log) {
      console.log('[' + NAME + ': logging-only mode]', requestBody);
    }
  }
};

Client.prototype.track = function(body) {
  if (!body.userId) {
    throw new Error(NAME + '.track() requires userId property');
  } else if (!body.event) {
    throw new Error(NAME + '.track() requires event property');
  } else {
    var url = API_BASE_URL + '/track';
    var requestBody = {
      method: 'POST',
      headers: headers(this.key),
      body: JSON.stringify({
        type: 'track',
        userId: '' + body.userId,
        event: body.event,
        properties: body.properties || {}
      })
    };

    if (!this.loggingOnly) {
      fetch(url, requestBody);
    } else {
      if (console && console.log) {
        console.log('[' + NAME + ': logging-only mode]', requestBody);
      }
    }
  }
};

module.exports = Client;
