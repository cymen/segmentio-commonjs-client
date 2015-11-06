// polyfills
require('Base64');
require('es6-promise');
require('whatwg-fetch');

var API_BASE_URL = 'https://api.segment.io/v1';

var Client = function(key) {
  this.key = btoa(key + ':');
}

Client.prototype.track = function(body) {
  if (!body.userId) {
    throw new Error('segmentio-commonjs-client.track() requires userId property');
  } else if (!body.event) {
    throw new Error('segmentio-commonjs-client.track() requires event property');
  } else {
    fetch(API_BASE_URL + '/track', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'track',
        userId: body.userId,
        event: body.event,
        properties: body.properties || {}
      })
    });
  }
};

module.exports = Client;
