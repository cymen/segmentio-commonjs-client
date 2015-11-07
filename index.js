// polyfills
require('es6-promise');
require('whatwg-fetch');
var base64 = require('Base64');
if (!window.btoa) {
  window.btoa = base64.btoa;
}

var NAME = 'segmentio-commonjs-client';
var VERSION = require('./package.json').version;
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

function context() {
  return {
    library: {
      name: 'segmentio-commonjs-client',
      version: VERSION
    },
    page: {
      path: document.location.pathname,
      referrer: document.referrer,
      search: document.location.search,
      title: document.title,
      url: document.location.href
    },
    userAgent: window.navigator.userAgent
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
      context: context(),
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
        context: context(),
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
